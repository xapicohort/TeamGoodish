
//***********************************************************************************************************************************************************
// connect to Watershedlrs - learning records store
function pageLoaded(){
  var key = "88501b323fd4d9";
  var secret = "b454efc7b112ed";
  var conf = {
      "endpoint" : "https://watershedlrs.com/api/organizations/15592/lrs/",
      "auth" : "Basic " + toBase64(key + ':' + secret),
	};
	ADL.XAPIWrapper.changeConfig(conf);
}

//*********************************************************************************************************************************************************
//statements
// Send Initiation Statements
function sendInitiationStatement(){
	var statement = {
	    "actor": {
	        "mbox": "mailto:"+ uUserEmail,
	        "name": vuser,
	        "objectType": "Agent"
	    },
	    "verb": {
	        "id": "http://adlnet.gov/expapi/verbs/initialized",
	        "display": {"en-US": "initialized"}
	    },
	    "object": {
	        "id": "http://learningdojo.net/xapi/Chatbot_initiated",
	        "definition": {
	            "name": {"en-US": "chatbot initiated"},
	            "description": {"en-US": "chatbot initiated"}
	        },
	        "objectType": "Activity"
	    }
	};
	ADL.XAPIWrapper.sendStatement(statement);
}

// Send Completion Statements
function sendCompletionStatement(){
  var statement = {
      "actor": {
          "mbox": "mailto:"+ uUserEmail,
          "name": vuser,
          "objectType": "Agent"
      },
      "verb": {
          "id": "http://adlnet.gov/expapi/verbs/completed",
          "display": {"en-US": "completed"}
      },
      "object": {
          "id": "http://learningdojo.net/xapi/Chatbot_completed",
          "definition": {
              "name": {"en-US": "chatbot Survey completed "},
              "description": {"en-US": "chatbot Survey completed"}
          },
          "objectType": "Activity"
      }
  };
	ADL.XAPIWrapper.sendStatement(statement);
}

//gloabl variabls - Rarry
var messages = [], //array that hold the record of each string in chat
  lastUserMessage = "", //keeps track of the most recent input string from the user
  botMessage = "", //var keeps track of what the chatbot is going to say
  botName = 'Chatbot', //name of the chatbot
  talking = true; //when false the speach function doesn't work

//*******************************************************************************************************************
//pre-loaded message while enters the page
// the first message
function botloadingmsg(){
  //var chatboxmsg = document.getElementById("chatbox").placeholder = "";
  messages.push("<b>" + botName + ":</b> " + "Hello! What is your name?</br>");
  document.getElementById("chatlog" + 1).innerHTML = messages[messages.length - 1]

  }

//gloabl variabls
var vUsername = "";
var uUserEmail = "";
var vuser = "";

//Conditional Statements
function chatbotResponse() {
//get user name
//the 2nd message
if (lastUserMessage !="") {
    vUsername = lastUserMessage.substring(0, 50);
    botMessage ="Thanks " + vUsername +"!" +" <br> &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; What is your email adress?";
}

  //get user email address
  // the 3rd message
  if (lastUserMessage.includes('@gmail.com')){
    uUserEmail = lastUserMessage;

    //get user name form the records
    vuser = messages[messages.length - 3].substring(43, 100);

    botMessage ="Thank you, " + vuser + "<br> <br> &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Please enter a number for the characteristics that most closely match the job for which you are sourcing: <br> <br> &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Career-level: <br> &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 1.Entry level <br> &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 2.Mid-Career/Management <br> &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 3.Executive (C-level)";

    //sent Initiation statement
    sendInitiationStatement();
    }

    //data collection - question 1
    //the 4th message
    if(lastUserMessage.includes('1') || lastUserMessage.includes('2') || lastUserMessage.includes('3')){
        botMessage ="Thank you for your support and effort. Our goal is to help hiring professionals be actively aware and responsive to <br> &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; potential racial bias that occurs when sourcing all candidates. Its purpose is to prevent racial bias and provide everyone <br> &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; a fair chance. We support diversity inclusion and equity. <br> <br> &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; To complete this [bot], type DONE.";

    }

    //complete the survey
    if(lastUserMessage.toUpperCase().includes('DONE')){
        botMessage ="Thank you for your time!";

        //sent completion statement
        sendCompletionStatement();
  }
}


//****************************************************************
//this runs each time enter is pressed.
//It controls the overall input and output
function newEntry() {
  //if the message from the user isn't empty then run
  if (document.getElementById("chatbox").value != "") {
    //pulls the value from the chatbox ands sets it to lastUserMessage
    lastUserMessage = document.getElementById("chatbox").value;
    //sets the chat box to be clear
    document.getElementById("chatbox").value = "";
    //adds the value of the chatbox to the array messages
//    messages.push("<b>" + "You" + ":</b> " +lastUserMessage);
    messages.push("&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; <b>" + 'You' + ":</b> " + lastUserMessage);
    //Speech(lastUserMessage);  //says what the user typed outloud
    //sets the variable botMessage in response to lastUserMessage
    chatbotResponse();
    //add the chatbot's name and message to the array messages
    messages.push("<b>" + botName + ":</b> " + botMessage);

    //outputs the last few array elements of messages to html
    for (var i = 1; i < 12; i++) {
      if (messages[messages.length - i])
        document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
      }
    }
}


//runs the keypress() function when enter key is pressed
document.onkeypress = keyPress;
//if the key pressed is 'enter' runs the function newEntry()
function keyPress(e) {
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if (key == 13 || key == 3) {
    //runs this function when enter is pressed
      newEntry();
  }
  if (key == 38) {
    console.log('hi')
      //document.getElementById("chatbox").value = lastUserMessage;
  }
}

//clears the placeholder text ion the chatbox
//this function is set to run when the users brings focus to the chatbox, by clicking on it
function placeHolder() {
  document.getElementById("chatbox").placeholder = "";
}
