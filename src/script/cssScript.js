const chatHistories = document.getElementsByClassName('chat-history');
for (let el of chatHistories) {
  el.style.setProperty('background', 'pink', 'important');
}

// 2. Hide elements with class 'top-hedding'
const topHeadings = document.getElementsByClassName('top-hedding');
for (let el of topHeadings) {
  el.style.setProperty('display', 'none', 'important');
}

// 3. Hide elements with class 'saveit' inside any input tag (note: input can't contain children in HTML)
const saveItElements = document.getElementsByClassName('saveit');
for (let el of saveItElements) {
  el.style.setProperty('display', 'none', 'important');
}

// 4. Set height 100% for elements with class 'chat'
const chats = document.getElementsByClassName('chat');
for (let el of chats) {
  el.style.setProperty('height', '100%', 'important');
}
