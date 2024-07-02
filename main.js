// 유저가 값을 입력한다
// + 버튼을 클릭하면 할 일이 추가된다
// 엔터 버튼을 눌러도 할 일이 추가된다
// delete 버튼을 누르면 할 일이 삭제된다
// check 버튼을 누르면 할일이 종료되고 취소선이 생긴다
// 1. check 버튼을 클릭하면 false -> true가 된다
// 2. true이면 끝난걸로 간주하고 취소선 보여주기
// 3. false이면 안끝난걸로 간주하고 그대로 

// 체크 버튼을 한번 더 누르면 취소됐던게 다시 돌아온다
// 진행중, 끝남 탭을 누르면 언더바가 이동한다
// 끌남 탭은 끝난 아이템만, 진행중 탭은 진행중인 아이템만 나온다 
// 전체 탭을 누르면 전체 리스트가 나온다 

let userInput = document.getElementById('todo-input');
let addBtn = document.getElementById('add-btn');
let checkBtn = document.getElementById('check');
let deleteBtn = document.getElementById('delete');
let todoList = document.querySelector('.todo-list');
let inputValueList = [];


addBtn.addEventListener('click', addTask);

function addTask (){
  let task = {
    taskContent: userInput.value, // 유저가 실제로 입력한 값
    id: generateRandomId(),  // 랜덤한 id
    isComplete: false,  // 완료 여부 
  }
  inputValueList.push(task);
  console.log(inputValueList);
  render();
}

function render (){
  let resultHTML = '';
  for (let i = 0; i < inputValueList.length; i++){
    if (inputValueList[i].isComplete == true){
      resultHTML += `<div class="todo-list task-done">
                      <div class="todo-item">
                        <span>${inputValueList[i].taskContent}</span>
                      </div>
                      <div class="btn-box">
                        <button onclick="toggleComplete('${inputValueList[i].id}')" type="button" id="check" class="icon-btn"><i class="fa-solid fa-check"></i></button>
                        <button onclick="deleteTask()" type="button" id="delete" class="icon-btn"><i class="fa-regular fa-trash-can"></i></button>
                      </div>
                    </div>`
    // 조심해야 할 것
    // <button onclick="toggleComplete('${inputValueList[i].id}')" type="button" id="check" class="icon-btn"><i class="fa-solid fa-check"></i></button> 이 코드에서 toggleComplete('') 안에 따옴표를 넣는 것은 이게 함수이고 매개변수로 들어갈 값이 문자열(${inputValueList[i].id})이기 때문
    } else {
      resultHTML += `<div class="todo-list">
                      <div class="todo-item">
                        <span>${inputValueList[i].taskContent}</span>
                      </div>
                      <div class="btn-box">
                        <button onclick="toggleComplete('${inputValueList[i].id}')" type="button" id="check" class="icon-btn"><i class="fa-solid fa-check"></i></button>
                        <button onclick="deleteTask()" type="button" id="delete" class="icon-btn"><i class="fa-regular fa-trash-can"></i></button>
                      </div>
                    </div>`
    }
  }
  document.querySelector('.todo-board').innerHTML = resultHTML;
}

// false->true / true->false 바꾸는 함수
function toggleComplete (id){
  console.log(id);
  for (let i = 0; i < inputValueList.length; i++){
    if (inputValueList[i].id == id){
      inputValueList[i].isComplete = !inputValueList[i].isComplete;
      break;
    }
  }
  render(); 
  // 조심해야 할 것
  // 버튼을 클릭할 때 실행되는 함수는 toggleComplete이므로 toggleComplete을 클릭했을 때 html이 그려지게 하려면 render()를 무조건 호출해줘야 한다
}

function deleteTask (){
  console.log('삭제됨'); // 잘 작동함
}

function generateRandomId (){
  return "_" + Math.random().toString(36).substring(2, 9);
}

