//---------------------------------------------------------------------------------Sneaky Squirrel------------------------------------------------------------------------------//
                                         //----------------------------------------eventshandler.js--------------------------------//

//Registering a compoonent to handle all events
AFRAME.registerComponent("events-handler",{
    //Schema
    schema:{},
    
    //Calling an init function
    init:function(){

        //Adding an event listener for click events
        this.el.addEventListener("click",(e)=>{  
          //Sourcing and removing the introdcutory text  
          text_gr_el=document.querySelector("#intro_tx")
          text_gr_el.remove()

          //Calling all three functiosn to initiate game mechanics such as spontaneously changing the squirrel's position, update\ing the score and text and creating the timer
          this.changeSquirrelPosition();  
          this.createTextandUpdateScore();
          this.createandRunTimer()
          
        })
    },

    //Defining a function to randomly change the squirrel's position
    changeSquirrelPosition:function(){
        
            //Creating a dummy squirrel element and giving it gltf-model and id attributes
            squirrel_el=document.createElement("a-entity")
            squirrel_el.setAttribute("id","squirrel_dum_opp")
            squirrel_el.setAttribute("gltf-model","#squirrel_opponent")
            
            //Sourcing the scene element and appending the squirrel element as a child to it
            scene_el=document.querySelector("#scene_wrld")
            scene_el.appendChild(squirrel_el)

            //Setting a new time interval "position"
            var position=setInterval(()=>{

            //Setting the y position value of the squirrel element to 500, to make it invisible   
            this.el.setAttribute("position","0 500 0")

            //Setting random position attributes to the dummy squirrel element and multiplying its scale by 2
            squirrel_el.setAttribute("scale","2 2 2")
            random_pos_x=Math.random()*10-Math.random()*10
            random_pos_y=Math.random()*2-Math.random()*2
            squirrel_el.setAttribute("position",{x:random_pos_x,y:random_pos_y})
           },1400)    
    },

    //Defining a function to render text and update its value in accordance to the score
    createTextandUpdateScore:function(){

        //Creating two new elements and giving them text and position attributes:- Indicator and actual
        score_el=document.createElement("a-entity") //~~(i) Inidcator: To indicate the score
        score_num_el=document.createElement("a-entity") //~~(ii) Actual: To dusplay the value of the score

        ////Text attributes
        score_el.setAttribute("text",{value:"Score: ",color:"red",align:"center",font:"exo2bold",width:5})
        score_num_el.setAttribute("text",{value:"0",color:"red",align:"center",font:"exo2bold",width:5})

        ////Position attributes
        score_el.setAttribute("position","-0.2 1 -2")
        score_num_el.setAttribute("position","0.2 1 -2")

        //Sourcing the caerma elements and appending Indicator and Actual elements as a child to it
        camera_el=document.querySelector("#camera_pl")
        camera_el.appendChild(score_el)
        camera_el.appendChild(score_num_el)

        //Sourcing the dummy squirrel element
        squirrel_dum_el=document.querySelector("#squirrel_dum_opp")
        squirrel_dum_el.addEventListener("click",()=>{

            //Sourcing the value of the text attribute of the Actual element
            score_num_el_value=score_num_el.getAttribute("text").value

            //Converting the value to an integer and incrementing it by 1
            score_num_el_value=parseInt(score_num_el_value)+1
            score_num_el.setAttribute("text",{value:score_num_el_value})

            //Verifying whether the value of the score is 5 or not
            ///Case-1 -The score value is 5
            if(score_num_el_value===5){

                //Calling a function to initiate proceedings for a win
                this.wonGame()
            }
        })
    },

    //Defining a function to create and handle a timer
    createandRunTimer:function(){
      
        //Creating a new element for the timer 
        text_time_el=document.createElement("a-entity")
 
        //Giving the timer element position and text attributes 
        text_time_el.setAttribute("position","-0.2 1 -3")
        text_time_el.setAttribute("text",{value:"Timer",color:"green",align:"center",width:7,font:"exo2bold"})

        //Socuring the camera element and appending the camra element as a child to it
        camera_el=document.querySelector("#camera_pl")
        camera_el.appendChild(text_time_el)
        
        //Declaring a variable for the net time
        var time_tot=110

        //Setting a new interval 
        timer=setInterval(()=>{

            //Declaring two variables for minutes and seconds repsectively
            var time_min=parseInt(time_tot/60)//~~(i) Minutes
            var time_sec=parseInt(time_tot % 60)//~~(ii) Seconds

            //Setting Minutes and Seconds as values of the text attribute to the timer element, that too in a timer format
            text_time_el.setAttribute("text",{value:"0"+time_min+":"+time_sec})

            //Verifying whether Minutes is equal to 0 or not
            ////Case-1 -Minutes is equal to 0
            if(time_min===0){
                
                //Setting the  color of the text element to yellow
                text_time_el.setAttribute("text",{value:"0"+time_min+":"+time_sec,color:"yellow"})

                //Verifying whether Seconds is lesser than 30 or not
                ////Case-1 Seconds is lesser than 30
                if(time_sec<30){

                    //Setting the  color of the text element to red
                    text_time_el.setAttribute("text",{value:"0"+time_min+":"+time_sec,color:"red"})
                }

                //Verifying whether Seconds is lesser than 30 seconds or not
                ////Case-1 Seconds is equal to 0
                if(time_sec===0){

                   //Setting the  color of the text element to red
                   text_time_el.setAttribute("text",{value:"0"+time_min+":"+"0"+time_sec,color:"red"})

                   //Calling a function initiate proceedings for a loss
                   this.lostGame()
                }
                
            }
            //Verifying whether Seconds is lesser than 10 seconds or not 
            ////Case-1 -Seconds is lesser than 10 seconds
            if(time_sec<10){
                text_time_el.setAttribute("text",{value:"0"+time_min+":0"+time_sec,color:"red"})
            }

            //Subtracting the net time by 1
            time_tot-=1
        },1000)
    },

    //Defining a function to handle events after a loss
    lostGame:function(){
     
        //Selecting the dummy squirrel element and removing it
        squirrel_dum_el=document.querySelector("#squirrel_dum_opp")
        squirrel_dum_el.remove()

        //Alerting the palyer about the loss
        window.alert("You lost but that's fine, you can always try the next time, remember life is a dart board, you can hit it sometimes, other times you can't, but you always have to try :)")
       
        //Creating an element for the text to be displayed at loss
        lost_text=document.createElement("a-entity")

        //Setting the text and position attributes to the text element
        lost_text.setAttribute("text",{value:"YOU LOST",align:"center",font:"mozillavr",width:24,color:"red"})
        lost_text.setAttribute("position","0 2 -4")

        //Sourcing the scene element and appending the loss element as a child to it
        scene_el=document.querySelector("#scene_wrld")
        scene_el.appendChild(lost_text)

        //Clearing the interval responsible for running the timer
        clearInterval(timer)
    },

    //Defining a function to handle events after a win
    wonGame:function(){
        
        //Creating an element for the text to be displayed at victory
        won_text=document.createElement("a-entity")

        //Setting the text and position attributes to the text element
        won_text.setAttribute("text",{value:"YOU WON",align:"center",font:"mozillavr",width:24,color:"green"})
        won_text.setAttribute("position","0 2 -4")

        //Alerting the palyer about the victory
        window.alert("You won! Congrats! It took me a lot of time to win this game, even more than making it. Now you can just sit back and try to increase your score even more by clicking on the squirrel who's probably furious now ")

        //Clearing the interval responsible for running the timer
        clearInterval(timer)

        //Sourcing the scene element and appending the loss element as a child to it
        scene_el=document.querySelector("#scene_wrld")
        scene_el.appendChild(won_text) 
    }
})

                                         //----------------------------------------eventshandler.js--------------------------------//
//---------------------------------------------------------------------------------Sneaky Squirrel------------------------------------------------------------------------------//                                     
