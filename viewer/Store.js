function keta2 (num) {
  if (num < 10) {
    return `0${num}`
  } else {
    return `${num}`
  }
}

function date2hms (date) {
  return `${keta2(date.getHours())}:${keta2(date.getMinutes())}:${keta2(date.getSeconds())}`
}

const Store = {
  time: null,
  intervals: {}
}

Store.intervals.time = setInterval(() => { Store.time = date2hms(new Date()) }, 1000)

export default Store
