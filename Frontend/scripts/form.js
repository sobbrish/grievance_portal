function home(event){
            event.preventDefault();
            window.location.href = '/main'
        };

     
        const bbb = document.getElementById("blublublu");
      


        document.querySelectorAll('.date').forEach(date => date.textContent = new Date().toLocaleDateString())

        function next(number){
            document.querySelectorAll('.big-div').forEach(i=>{
                i.classList.add('hidden');
            });
            document.getElementById(`${number}`).classList.remove('hidden');
        }


        window.addEventListener("DOMContentLoaded", (e) => {
            const k_drama_audio = document.getElementById("time_lapse");
            k_drama_audio.muted = false;
            k_drama_audio.play()
            msgEl.textContent = ""; 
            index = 0;
            showText(msgEl, text, 100);
            audio.play();
        });

        const mute_btn = document.getElementById("mute");

        mute_btn.addEventListener('click', e => {
            const k_drama_audio = document.getElementById("time_lapse");
            const bbb = document.getElementById("blublublu");
            k_drama_audio.muted = !k_drama_audio.muted;

            if (k_drama_audio.muted) {
                k_drama_audio.pause()
                bbb.pause()
                mute_btn.textContent = "🤐";
            } else {
                k_drama_audio.play()
                mute_btn.textContent = "🔊";
            }
                
        });

        const dialogue = document.querySelector('.dialogue');
        const msgEl = document.getElementById('msg');
        const audio = document.getElementById("blublublu");
        const choices = document.querySelector('.choices-btns');

        let isTyping = false;
        let typingTimer = null;
        let text = "Hello Danica, how are you doing today? Send me your complaints and I will listen to them!";
        let index = 0;
        let number;

        function showText(target, message, interval) {
            isTyping = true;
            typingTimer = setInterval(() => {
                if (index < message.length) {
                    target.textContent += message[index++];
                } else {
                    clearInterval(typingTimer);
                    isTyping = false;
                    if(number == 3){
                        document.querySelector('.next1').classList.remove('hidden');
                    }else if(number==2){
                        document.querySelector('.next').classList.remove('hidden');
                    }else if(number==1){
                        document.querySelector('.home').classList.remove('hidden');
                    }else{
                        choices.classList.remove('hidden');
                    }
                    
                }
            }, interval);
        }


        dialogue.addEventListener('click', () => {
            if (isTyping) {
                clearInterval(typingTimer);
                msgEl.textContent = text;
                isTyping = false;
                if(number == 3){
                    document.querySelector('.next1').classList.remove('hidden');
                }else if(number==2){
                    document.querySelector('.next').classList.remove('hidden');
                }else if(number==1){
                    document.querySelector('.home').classList.remove('hidden');
                }else{
                    choices.classList.remove('hidden');
                }
                audio.pause();
            }
        });

        const sophia_img = document.getElementById("sophia");
            
        function choice(num, event){
            event.preventDefault();
            choices.style.display = "none";
            msgEl.textContent = "";
            index = 0;
            number = num;
            document.querySelector('.next').addEventListener('click',e=>{
                e.preventDefault();
                next(num);
            })

            document.querySelector('.next1').addEventListener('click',e=>{
                e.preventDefault();
                console.log(num)
                next(num);
            })
            switch(num){
                case 3:
                    sophia_img.src = "sophia_love.png";
                    text = "Mwah... I'd be absolutely delighted to go on a date with you, Danica."
                    showText(msgEl, text, 100);
                    sophia_img.classList.add('love');
                    break;
                case 2:
                    sophia_img.src = "SOPHIA_annoyed.png";
                    text = "Huff... fine, send me your complaint. Let's see what you're whining about this time, Princess Danica."
                    msgEl.textContent = "";
                    showText(msgEl, text, 100);
                    sophia_img.classList.add('annoyed');
                    break;
                case 1:
                    sophia_img.src = "SOPHIA_call_me.png";
                    text = "Wow, bypassing the system just to talk to me? Can't say I blame you. Here's my number: 0223584658 — use it wisely, Danica."
                    showText(msgEl, text, 100);
                    sophia_img.classList.add('call');
                    break;

                
            }
        };

        const emoji = document.querySelector('.emoji');
        const emojis = document.querySelectorAll('[data-mood]');
        const moodTitle = document.querySelector('.mood-title');

        document.querySelector('.moods').addEventListener('mouseenter', e=>{
            e.preventDefault();
             emoji.classList.add('active');
             moodTitle.classList.add('active');
        });
         document.querySelector('.moods').addEventListener('mouseleave', e=>{
            e.preventDefault();
             emoji.classList.remove('active');
             moodTitle.classList.remove('active');

        });

        emojis.forEach(emo => { emo.addEventListener('click', e => {
            e.preventDefault();
            const value = emo.dataset.mood
            moodTitle.textContent = value;
        })});

        

        let complaint = document.getElementById('complaint');

        document.querySelector('#complain').addEventListener('submit', e=>{
            e.preventDefault();


            let formValues = {
                complaint: complaint.value,
                mood: moodTitle.textContent
            }

            let xhr = new XMLHttpRequest();
            xhr.open('POST', '/form');
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.onload = function(){
                console.log(xhr.responseText);
                if(xhr.responseText == 'success'){
                    window.location.href = '/main?submitted=true';
                }else{
                    alert('Somthing went wrong, try again!');
                }
            }

            xhr.send(JSON.stringify(formValues));

        });

        let comment = document.getElementById('comment');

        document.querySelector('#dateSophia').addEventListener('submit', e=>{
            e.preventDefault();
            
            let formValues = {
                comment: comment.value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                place: document.getElementById('where').value
            }

            let xhr = new XMLHttpRequest();
            xhr.open('POST', '/form2');
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.onload = function(){
                console.log(xhr.responseText);
                if(xhr.responseText == 'success'){
                    window.location.href = '/main?submitted=true';
                }else{
                    alert('Somthing went wrong, try again!');
                }
            }

            xhr.send(JSON.stringify(formValues));

        });
