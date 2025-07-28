
    const goback_btn = document.querySelector(".choice2");
    const sophia_img1 = document.getElementById("sophia_sad");
    const sophia_laugh = document.getElementById("sophia_laugh");
    const sophia_boohoo = document.getElementById("sophia_cry")

    let bool = false;

    document.querySelector('.log-out').addEventListener('click',e=>{
        if(bool == false){
            bool =true;
            popup(bool);
        }else{
            bool = false;
            popup(bool);
        }


    });

    function popup(pop){
        var msg = document.querySelector("#msg");
        var blur = document.getElementById('blur');
        var popup = document.getElementById('popup');

        function showText (target, message, index, interval) {
            if (index < message.length) {
                $(target).append(message[index++]);
                setTimeout(function () { showText(target, message, index, interval); }, interval);
            }
        }

         msg.textContent = "";

        if(pop){

            blur.classList.toggle('active');

            popup.classList.toggle('active');

            $(function () {
            showText("#msg", "You REALLY want to leave...? ", 0, 50);
            });


        }else{
            var blur = document.getElementById('blur');
            blur.classList.remove('active');
            var popup = document.getElementById('popup');
            popup.classList.remove('active');
            msg.textContent = "";
            bool = false;
        }

    }

    function toggle() {
        const sophia_img1 = document.getElementById("sophia_sad");


        const sad_k_drama = document.getElementById("sad_k_drama");
        const sophia_boohoo = document.getElementById("sophia_cry");
        //const sophia_laugh = document.getElementById("sophia_laugh");


        if (sad_k_drama.muted == true) {
             sad_k_drama.play();
            sad_k_drama.muted = false;

            sophia_boohoo.play();
            sophia_boohoo.muted = false;

        } else {
            sad_k_drama.pause();
            sad_k_drama.muted = true;

            sophia_boohoo.pause();
            sophia_boohoo.muted = true;

        }
    }


    let suppressMouseLeave = false;
    sophia_img1.src = "sophia_sad_man.png";

    goback_btn.addEventListener('mouseenter', e => {
        sophia_img1.src = "sophia_happy_man_confetti.png";
        sophia_laugh.currentTime = 0; // Rewind to start
        sophia_laugh.play();
        sophia_laugh.muted = false;
        toggle();

    });
    goback_btn.addEventListener('mouseleave', e => {
        if (suppressMouseLeave) return;
        sophia_img1.src = "sophia_sad_man.png";
        sophia_laugh.muted = true;
        sophia_laugh.pause();
        toggle();
    });

     const params = new URLSearchParams(window.location.search);
        if (params.get('submitted') === 'true') {
            alert('Complaint successfully submitted!');

            const url = new URL(window.location);
            url.searchParams.delete('submitted');
            window.history.replaceState({}, document.title, url.pathname);
    }


