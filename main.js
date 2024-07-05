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

let userInput = document.getElementById('todo-input');   // 유저 인풋 값
let addBtn = document.getElementById('add-btn');  // + 버튼
let checkBtn = document.getElementById('check');  // 체크 버튼
let deleteBtn = document.getElementById('delete');  // 삭제 버튼
let deleteAllBtn = document.getElementById('delete-all'); // 전체삭제 버튼
let todoList = document.querySelector('.todo-list');  // 할일 목록 1개의 div
let tabs = document.querySelectorAll('.tab');  // 탭 버튼들
let inputValueList = [];  // 유저가 입력한 목록들
let mode = "all"; // 처음 시작은 전체를 보여주므로 mode의 초기값은 all로 설정 
let filterList = [];  // 필터링된 목록들 
let underLine = document.querySelector('.underline'); // 메뉴 하단 바
let menuFirst = document.getElementById('all');  // 메뉴 첫 번째 요소



// 메뉴 언더라인 바 이동
tabs.forEach(function(menu){
  menu.addEventListener('click', function(event){
    horizontalIndicator(event);
  });
});

function horizontalIndicator (e){
  underLine.style.left = e.currentTarget.offsetLeft + "px";
  underLine.style.width = e.currentTarget.offsetWidth + "px";
  underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight -3 + "px";
  // -3 하는 이유 : -3을 하지 않으면 박스 아래쪽에 밑줄이 생기는데 이를 박스 안쪽으로 끌고오기 위해 언더라인의 height만큼 뺀다
}

// add 버튼 클릭시 함수 실행
addBtn.addEventListener('click', addTask);

// add 버튼 클릭 함수
function addTask (){
  if (userInput.value == ""){
    alert("할일을 입력하세요");
    userInput.focus(); // 알림창 띄운 후 다시 input창에 포커스
    return;
  }
  let task = {
    taskContent: userInput.value, // 유저가 실제로 입력한 값
    id: generateRandomId(),  // 랜덤한 id, task가 호출될 때 함수 실행 
    isComplete: false,  // 완료 여부 
  }
  inputValueList.push(task);
  console.log(inputValueList);
  render(); // render()함수 호출
  userInput.value = ""; // 유저가 add 버튼을 클릭하면 인풋창의 내용 지움 
}

// 엔터키 눌렀을 때 할일 추가
function enterKey() {
  if (window.event.keyCode == 13) {
      // 엔터키가 눌렸을 때 실행할 내용
      addTask();
  }
}


// 탭 기능 
// 선택한 탭에 이벤트 리스너 달기
for (let i = 0; i < tabs.length; i++){
  tabs[i].addEventListener('click', function (event){
    filter(event);
  });
}

// filter 함수
function filter (event){
  //mode = event.target.id;

  if (event) {
    mode = event.target.id;
    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.left = event.target.offsetLeft + "px";
    underLine.style.top = event.target.offsetTop + (event.target.offsetHeight) -3 + "px";
  }

  filterList = [];
  if (mode === "all"){
    // 전체 리스트를 보여준다
    render();
  } else if (mode === "ongoing"){
    // 진행중인 아이템을 보여준다.
    // task.isComplete : false
    for (let i = 0; i < inputValueList.length; i++){
      if (inputValueList[i].isComplete == false){
        filterList.push(inputValueList[i]);
      }
    }
    render();
  } else if (mode === "done"){
    // 끝난 케이스를 보여준다
    // task.isComplete : true
    for (let i = 0; i < inputValueList.length; i++){
      if (inputValueList[i].isComplete == true){
        filterList.push(inputValueList[i]);
      }
    }
    render();
  }
  // render();
}
// --------------------------

// function filter(event) {
//   if (event) {
//       mode = event.target.id;
//       underLine.style.width = event.target.offsetWidth + "px";
//       underLine.style.left = event.target.offsetLeft + "px";
//       underLine.style.top =
//           event.target.offsetTop + (event.target.offsetHeight) + "px";
//   }

//   filterList = [];

//   if (mode === "all") {
//       //everything
//       render();
//   } else if (mode === "ongoing") {
//       //task.isComplete == false
//       for (let i = 0; i < inputValueList.length; i++) {
//           if (inputValueList[i].isComplete == false) {
//               filterList.push(inputValueList[i]);
//           }
//       }
//       render();
//   } else if (mode === "done") {
//       //task.isComplete == true
//       for (let i = 0; i < inputValueList.length; i++) {
//           if (inputValueList[i].isComplete == true) {
//               filterList.push(inputValueList[i]);
//           }
//       }
//       render();
//   }
// }

// html을 그려주는 함수 
function render (){
  // 1. 내가 선택한 탭에 따라서
  // 2. 리스트를 달리 보여준다
  let list = [];

  if (mode == "all"){
    list = inputValueList;
  } else if (mode == "ongoing" || mode == "done"){
    list = filterList;
  }

  let resultHTML = '';
  for (let i = 0; i < list.length; i++){
    if (list[i].isComplete == true){
      resultHTML += `<div class="todo-list task-done">
                      <div class="todo-item-box">
                        <i class="fa-solid fa-circle"></i>
                        <div class="todo-item">
                          <span>${list[i].taskContent}</span>
                        </div>
                      </div>
                      <div class="btn-box">
                        <button onclick="editTask('${list[i].id}')" type="button" id="check" class="icon-btn"><i class="fa-regular fa-pen-to-square"></i></button>
                        <button onclick="toggleComplete('${list[i].id}')" type="button" id="check" class="icon-btn"><i class="fa-solid fa-arrow-rotate-left"></i></button>
                        <button onclick="deleteTask('${list[i].id}')" type="button" id="delete" class="icon-btn"><i class="fa-regular fa-trash-can"></i></button>
                      </div>
                    </div>`
    // 조심해야 할 것
    // <button onclick="toggleComplete('${inputValueList[i].id}')" type="button" id="check" class="icon-btn"><i class="fa-solid fa-check"></i></button> 이 코드에서 toggleComplete('') 안에 따옴표를 넣는 것은 이게 함수이고 매개변수로 들어갈 값이 문자열(${inputValueList[i].id})이기 때문
    } else {
      resultHTML += `<div class="todo-list">
                      <div class="todo-item-box">
                        <i class="fa-regular fa-circle"></i>
                        <div class="todo-item">
                          <span>${list[i].taskContent}</span>
                        </div>
                      </div>
              
                      <div class="btn-box">
                        <button onclick="editTask('${list[i].id}')" type="button" id="check" class="icon-btn"><i class="fa-regular fa-pen-to-square"></i></button>
                        <button onclick="toggleComplete('${list[i].id}')" type="button" id="check" class="icon-btn"><i class="fa-solid fa-check"></i></button>
                        <button onclick="deleteTask('${list[i].id}')" type="button" id="delete" class="icon-btn"><i class="fa-regular fa-trash-can"></i></button>
                      </div>
                    </div>`
    }
  }
  document.querySelector('.todo-board').innerHTML = resultHTML;
}


// 내용 수정하는 함수
function editTask (id) {
  let newContent = prompt("수정할 내용을 입력하세요");
  for (let i = 0; i < inputValueList.length; i++) {
    if (inputValueList[i].id === id) {
        inputValueList[i].taskContent = newContent;
        break;
    }
  }
  render();
}

// false->true / true->false 바꾸는 함수
// render()내부의 버튼에서 사용하고 있음 
function toggleComplete (id){
  console.log(id);
  for (let i = 0; i < inputValueList.length; i++){
    if (inputValueList[i].id == id){
      inputValueList[i].isComplete = !inputValueList[i].isComplete;
      break;
    }
  }
  filter();   // 정답코드와 다른점 : 여기를 render가 아니라 filter로 바꿈 
  // 조심해야 할 것
  // 버튼을 클릭할 때 실행되는 함수는 toggleComplete이므로 toggleComplete을 클릭했을 때 html이 그려지게 하려면 render()를 무조건 호출해줘야 한다
}
4


// 클릭된 요소를 삭제하는 함수 
function deleteTask (id){
  console.log('삭제됨', id); // 잘 작동함
  let deleteCheck = confirm("정말 삭제하시겠습니까?");
  console.log(deleteCheck);
  if (deleteCheck == true){
    for (let i = 0; i < inputValueList.length; i++){
      if (inputValueList[i].id == id){
        inputValueList.splice(i, 1);
        break;
      }
    }
  } else {
    return;
  }
  console.log(inputValueList);
  filter();  // 여기도 정답코드와 다른점 : filter로 바꾼다 
}



// 전체삭제 기능 
deleteAllBtn.addEventListener('click', deleteAll);

function deleteAll (){
  inputValueList.splice(0);
  console.log(inputValueList);
  document.querySelector('.todo-board').innerHTML = "";
}



// 랜덤 id를 생성하는 함수 
function generateRandomId (){
  return "_" + Math.random().toString(36).substring(2, 9);
}

