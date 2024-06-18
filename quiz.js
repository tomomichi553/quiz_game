const quiz_list = [
    {
        image:'tan.jpg',
        question:'この肉の部位は？',
        answers:['カルビ','タン','リブロース','ネクタイ'],
        correct:'タン'
    },{
        image:'harami.jpg',
        question:'この肉の部位は？',
        answers:['カルビ','タン','リブロース','ハラミ'],
        correct:'ハラミ'
    },{
        image:'karubi.jpg',
        question:'この肉の部位は？',
        answers:['カルビ','タン','リブロース','ハラミ'],
        correct:'カルビ'
    },{
        image:'rosu.jpg',
        question:'この肉の部位は？',
        answers:['ロース','タン','リブロース','ハラミ'],
        correct:'ロース'
    },{
        image:'heart.jpg',
        question:'この肉の部位は？',
        answers:['カルビ','タン','レバー','ハツ'],
        correct:'ハツ'
    },{
        image:'hire.jpg',
        question:'この肉の部位は？',
        answers:['カルビ','ヒレ','サーロイン','ハラミ'],
        correct:'ヒレ'
    },{
        image:'sa-roin.jpg',
        question:'この肉の部位は？',
        answers:['カルビ','ハラミ','タン','サーロイン'],
        correct:'サーロイン'
    },{
        image:'reba.jpg',
        question:'この肉の部位は？',
        answers:['レバー','タン','リブロース','ハラミ'],
        correct:'レバー'
    },{
        image:'nekutai.jpg',
        question:'この肉の部位は？',
        answers:['カルビ','ネクタイ','リブロース','ハラミ'],
        correct:'ネクタイ'
    },{
        image:'riburo.jpg',
        question:'この肉の部位は？',
        answers:['カルビ','タン','リブロース','ハラミ'],
        correct:'リブロース'
    },
];

const QUESTION_LENGTH = 5;
let quizIndex = 0;
let score = 0;


function getRandomQuestions() {
    // 出題する問題のインデックスリスト
    const questionIndexList = [];
  
    // 出題数になるまでランダムなインデックスを作成する
    while (questionIndexList.length !== QUESTION_LENGTH) {
      // ランダムなインデックスを作成する
      const index = Math.floor(Math.random() * quiz_list.length);
      // インデックスリストに含まれていない場合にインデックスを追加する
      if (!questionIndexList.includes(index)) {
        questionIndexList.push(index);
      }
    }
  
    // 全データから出題する問題を取得する
    const questionList = questionIndexList.map((index) => quiz_list[index]);
    return questionList;
  }

  
let quiz = getRandomQuestions();


//定数を文字列のHTMLに反映させる


const $button = document.getElementsByClassName('answer-button');
const dialog = document.getElementById('dialog'); // dialog要素の取得
const questionResult = document.getElementById('questionResult'); // questionResult要素の取得
const nextButton = document.getElementById('nextButton');

const setupQuiz = ()=>{
    //document.getElementById('mypic').style.marginTop = '20px';
    document.getElementById('mypic').src = 'quiz_image/' + quiz[quizIndex].image;
    document.getElementById('js-question').textContent = quiz[quizIndex].question;
    for (let i = 0;i < $button.length;i++){
        $button[i].textContent = quiz[quizIndex].answers[i];
        $button[i].disabled = false; 
    }
}
setupQuiz();

function audio_correct() {
    document.getElementById('btn_audio_correct').currentTime = 0; //連続クリックに対応
    document.getElementById('btn_audio_correct').play(); //クリックしたら音を再生
}

function audio_incorrect() {
    document.getElementById('btn_audio_incorrect').currentTime = 0; //連続クリックに対応
    document.getElementById('btn_audio_incorrect').play(); //クリックしたら音を再生
}

//クリックしたら正誤判定する
function checkAnswer(answer) {
    if (quiz[quizIndex].correct === answer) {
        audio_correct();
        questionResult.innerText = "⭕️";
        score++;
    } else {
        audio_incorrect();
        questionResult.innerText = "✖️";
    }
    dialog.showModal();
}

nextButton.addEventListener("click", () => {
    dialog.close();

    quizIndex++;
    if (quizIndex < quiz.length) {
        setupQuiz();
    } else {
        localStorage.setItem('score', score);
        localStorage.setItem('total', quiz.length);
        window.location.href = 'result.html';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < $button.length; i++) {
        $button[i].addEventListener('click', (e) => {
            checkAnswer(e.target.textContent);
        });
    }
});


