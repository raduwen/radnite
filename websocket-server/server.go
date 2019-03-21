package main

import (
	"encoding/json"
	"flag"
	"log"
	"net/http"
	"reflect"
	"strings"

	"github.com/gorilla/websocket"
)

var addr = flag.String("addr", "0.0.0.0:7000", "http service address")

var upgrader = websocket.Upgrader{}
var connections []*websocket.Conn
var removeList []*websocket.Conn

type componentResponse struct {
	Component string `json:"component"`
	Props     string `json:"props"`
}

var currentState = componentResponse{}

func remove(conns []*websocket.Conn, search *websocket.Conn) []*websocket.Conn {
	result := []*websocket.Conn{}
	for _, v := range conns {
		if !reflect.DeepEqual(v, search) {
			result = append(result, v)
		}
	}
	return result
}

func component(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool {
		return true
	}
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade:", err)
		return
	}

	b, err := json.Marshal(currentState)
	if err != nil {
		log.Println("marshal:", err)
		return
	}
	err = c.WriteMessage(1, b)

	connections = append(connections, c)
	defer func() {
		c.Close()
		connections = remove(connections, c)
	}()
	for {
		mt, message, err := c.ReadMessage()
		if err != nil {
			log.Println("read:", err)
			break
		}
		commands := strings.Split(string(message), "|")
		currentState = componentResponse{Component: commands[0], Props: commands[1]}
		log.Printf("recv: %s", message)
		b, err := json.Marshal(currentState)
		if err != nil {
			log.Println("marshal:", err)
			break
		}

		log.Printf("connections: %d", len(connections))
		removeList = nil
		for _, conn := range connections {
			err = conn.WriteMessage(mt, b)
			if err != nil {
				removeList = append(removeList, conn)
				log.Println("write:", err)
			}
		}
		for _, conn := range removeList {
			conn.Close()
			connections = remove(connections, conn)
		}
	}
}

func main() {
	flag.Parse()
	log.SetFlags(1)
	log.Printf("start")
	http.HandleFunc("/component", component)
	log.Fatal(http.ListenAndServe(*addr, nil))
}
