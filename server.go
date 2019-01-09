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
var remove_list []*websocket.Conn

type ComponentResponse struct {
	Component string `json:"component"`
	Props     string `json:"props"`
}

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
		res := &ComponentResponse{Component: commands[0], Props: commands[1]}
		log.Printf("recv: %s", message)
		b, err := json.Marshal(res)
		if err != nil {
			log.Println("marshal:", err)
			break
		}

		log.Printf("connections: %d", len(connections))
		remove_list = nil
		for _, conn := range connections {
			err = conn.WriteMessage(mt, b)
			if err != nil {
				remove_list = append(remove_list, conn)
				log.Println("write:", err)
			}
		}
		for _, conn := range remove_list {
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
