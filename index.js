window.onload = function (){

    let count = 0;
    let intervalId;
    
    const keyboard = ["q", "w", "e", "r", " ", "u", "i", "o", "p"];

    let recordedKeys = []; 

    const keys = document.querySelectorAll(".kalimba");
    const playRecord = document.getElementById("playButton");
    const resetRecord = document.getElementById("resetButton");

    playRecord.onclick = playMusic;
    resetRecord.onclick = resetMusic;

    keys.forEach(key => {
        key.addEventListener("click", () => {
            playNote(key);
            recordedKeys.push(key)
        })
    });

    document.addEventListener("keydown", e => {
        const key = e.key;
        const keyIndex = keyboard.indexOf(key);

        if(keyIndex > -1){
            playNote(keys[keyIndex]);
            recordedKeys.push(keys[keyIndex])
        }
    })

    function playNote(key){
        const noteAudio = document.getElementById(key.dataset.note);
        noteAudio.currentTime = 0;
        noteAudio.play()

        key.classList.add('vibrando');
        setTimeout(function() {
            key.classList.remove('vibrando');
        }, 300);
    }

    function playMusic() {
        count = 0; 
        clearInterval(intervalId); 

        intervalId = setInterval(function() {
            playRecord.classList.add("play-music")
            if (count < recordedKeys.length) {
                playNote(recordedKeys[count]);
                count++;
            } else {
                clearInterval(intervalId); 
                playRecord.classList.remove("play-music")
            }
        }, 500);
    }

    function resetMusic() {
        clearInterval(intervalId); 
        count = 0; 
        recordedKeys = []; 
    }
}