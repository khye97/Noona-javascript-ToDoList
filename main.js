// 유저가 값을 입력한다
// + 버튼을 클릭하면 할 일이 추가된다
// 엔터 버튼을 눌러도 할 일이 추가된다
// delete 버튼을 누르면 할 일이 삭제된다
// check 버튼을 누르면 할일이 종료되고 취소선이 생긴다 
// 체크 버튼을 한번 더 누르면 취소됐던게 다시 돌아온다
// 진행중, 끝남 탭을 누르면 언더바가 이동한다
// 끌남 탭은 끝난 아이템만, 진행중 탭은 진행중인 아이템만 나온다 
// 전체 탭을 누르면 전체 리스트가 나온다 

let userInput = document.getElementById('todo-input');
let addBtn = document.getElementById('add-btn');
let inputValueList = [];

addBtn.addEventListener('click', addTask);

function addTask (){
  let taskContent = userInput.value;
  inputValueList.push(taskContent);
  console.log(inputValueList);
  render();
}

function render (){
  let resultHTML = '';
  for (let i = 0; i < inputValueList.length; i++){
    resultHTML += `<div class="todo-list">
                      <div class="todo-item">
                        ${inputValueList[i]}
                      </div>
                      <div class="btn-box">
                        <button type="button" id="check">check</button>
                        <button type="button" id="delete">delete</button>
                      </div>
                    </div>`
    document.querySelector('.todo-board').innerHTML = resultHTML;                
  }
}