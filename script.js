// all variables 
var questionId = 0; // used for iterating through the array of questions.
var intervalId = null; // Timer while attempting quiz.
var count = 0; //timer
let score =  0; //if option chosen by user is correct it is increased by 1.
let totalTimeTaken = 0; // Total time taken to solve the whole quiz.
let totalAttempted =  0; //Total question attempted by the user.


// store the name of user from home page.
const getName = () =>{

let userName = document.getElementById("name").value;

   localStorage.setItem("name",userName);
   document.getElementById("name").value = "";


}


const displayQuestion = () =>{

    //setting the name of the test.
    document.getElementsByClassName("test-name")[0].innerHTML = JSON.parse(localStorage.getItem("testName"));
    
    if(intervalId)
    {
        clearInterval(intervalId);
    }   

    if(questionId < 10)
  {  const question = JSON.parse(localStorage.getItem("questions"));
   

    //counting time.
    const timerElement = document.getElementsByClassName("quiz-time")[0];
    count = 0;
    timerElement.innerHTML = count;
     intervalId = setInterval(() => {
        if (count <= 10) {
           
          
            count++; // increment count
            timerElement.innerHTML = count;
           
        } else {
            clearInterval(intervalId); // Stop the timer when count is less than 0
            totalTimeTaken +=  + 10;
            localStorage.setItem("totalTimeTaken",JSON.stringify(totalTimeTaken));
            questionId++;
            displayQuestion();
        }
       
    }, 1000); 
   
   //question name
  
      document.getElementsByClassName("q")[0].innerHTML =  question.questions[questionId].name;
   
  //question number
      document.getElementsByClassName("question-number")[0].innerHTML = parseInt(question.questions[questionId].id) + "/10";

  //score
      document.getElementsByClassName("score")[0].innerHTML = "Score:" + score

  //Option A
      document.getElementsByClassName("option-1")[0].innerHTML = question.questions[questionId].A;

  //Option B
      document.getElementsByClassName("option-2")[0].innerHTML = question.questions[questionId].B;

  //Option C
      document.getElementsByClassName("option-3")[0].innerHTML = question.questions[questionId].C;

  //Option D
      document.getElementsByClassName("option-4")[0].innerHTML = question.questions[questionId].D;
    
    
}
else
{  
   
    window.location.href = "result.html";
   
}
  
    
}


/* when user select an option than this function will check whether it is correct or not and 
if correct increasses the score by one, and move to next question. Since it is moving on next 
question we have store the total time taken till now in the variable and increase the number 
of question attrmpted by 1 */
const option = (optionName) =>{
    
    // Total question attempted till now plus 1.
    totalAttempted++;
    localStorage.setItem("totalAttempted", JSON.stringify(totalAttempted));

    // getting the question array to check the correct ans for that question.
    const question = JSON.parse(localStorage.getItem("questions"));
    
    // total time taken
    totalTimeTaken = (totalTimeTaken + parseInt(count));
    localStorage.setItem("totalTimeTaken",JSON.stringify(totalTimeTaken));

    // if the choosen option is correct.
    if(question.questions[questionId].correct === optionName)
    {
        // increase the score
        score++;
        localStorage.setItem("score",JSON.stringify(score));

    }

    // move to next question.
    localStorage.setItem("score",JSON.stringify(score));
    questionId++;
    displayQuestion();


    


}


// On the quiz page the bottom their is the nextQuestion button used to go to next question of that quiz*/
const nextQuestion = () =>{

    /* Time taken till prev question is  calculated and stored into "totalTimeTaken" local storage*/
    totalTimeTaken = (totalTimeTaken + parseInt(count));
    localStorage.setItem("totalTimeTaken",JSON.stringify(totalTimeTaken));

    /* question id is increses by 1*/
    questionId++;

    // call the function to display question, score, options etc.
    displayQuestion();

}


/* At the home page user get the option to select the topic for the 
   quiz when user choose one of the topic the "category" function is called
   the "paperName" is the parameter for this function.
   paperName is the topic for the quiz selected by the user. */ 
const category = async (paperName) =>{
    
    // setting the name of test for the quiz page.
    
    localStorage.setItem("testName", JSON.stringify(paperName));
       

    if(paperName === "Nouns")
    {
        try {
            
            // getting nouns questions.
            const response = await fetch("./questionPaper/nouns.json");
            const nouns = await response.json();

            localStorage.setItem("questions", JSON.stringify(nouns));
             window.location.href = "quiz.html"
          
          

        } catch (error) {
            console.log("There is a problem while loading the data",error);
        }
    }
    else if(paperName === "Pronouns")
    {
        try {
            
            // getting pronouns questions.
            const response = await fetch("./questionPaper/pronouns.json");
            const pronouns = await response.json();

            localStorage.setItem("questions", JSON.stringify(pronouns));
            window.location.href = "quiz.html"
          

        } catch (error) {
            console.log("There is a problem while loading the data", error);
        }
    }
    else if(paperName === "Prepositions")
    {
            try {
                
                // getting prepositions questions.
                const response = await fetch("./questionPaper/prepositions.json");
                const prepositions = await response.json();

                localStorage.setItem("questions", JSON.stringify(prepositions));
                window.location.href = "quiz.html"
    
            } catch (error) {
                console.log("There is a problem while loading the data", error);
            }
    }
    else if(paperName === "Adjectives")
    {
        try {
             
            // getting adjective questions.
            const response = await fetch("./questionPaper/adjectives.json");
            const adjectives = await response.json();

            localStorage.setItem("questions", JSON.stringify(adjectives));
            window.location.href = "quiz.html"

        } catch (error) {
            console.log("There is a problem while loading the data",error);
        }
    }

}

/*when user enter the result page his/her score, total questions attempted, total wrong, total correct and percentage are displayed calculated here. 
   This function will call when user is directed to the page*/
 function result(){
   
  
    //name of student on result page.
        document.getElementById("username").innerHTML = localStorage.getItem("name");
    
    // total time taken by the student.
       document.getElementById("timeTaken").innerHTML = JSON.parse(localStorage.getItem("totalTimeTaken")) + " seconds";

    // total attampted questions by the student.
        document.getElementById('attempted-count').innerHTML = JSON.parse(localStorage.getItem("totalAttempted"));

    // total correct questions of student.
        document.getElementById("correct-count").innerHTML = JSON.parse(localStorage.getItem("score"));
    
    // total wrong questions by the student
        document.getElementById("wrong-count").innerHTML = JSON.parse(localStorage.getItem("totalAttempted")) - JSON.parse(localStorage.getItem("score"));
    

    // Percentage of student
        document.getElementById("percent-count").innerHTML = (JSON.parse(localStorage.getItem("score"))/10)*100 + "%";


}



/* the result page have "start agiain" button when user click it the questionId set to zero as user want to give the same quiz 
again and after that redirect user to quiz page qith first question of that quiz......*/
function startAgain(){

    questionId = 0;

   
    window.location.href = "quiz.html";
}


/* the result page have "go to home" button when user click it the user directed to home page*/
function goToHome(){

    window.location.href = "index.html";
}