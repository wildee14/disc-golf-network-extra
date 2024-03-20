const observer = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
        if (mutation.type === 'childList') {
            for (const _ of mutation.addedNodes) {
                var video = $('.vjs-tech')[0];
                if (video) {
                    const controlDeck = ` 
                <div id='customControls'>
                    <button class='VodDetails__playButton___RWmZU' style='position:sticky;width:1em;' id='rewind' ><i class='material-icons' style='font-size:2rem;margin:0;'>replay_10</i></button>
                    <button class='VodDetails__playButton___RWmZU' style='position:sticky;width:1em;' id='fastforward' ><i class='material-icons' style='font-size:2rem;margin:0;'>forward_10</i></button>
                    <button class='VodDetails__playButton___RWmZU' style='position:sticky;width:1em;' id='exit' ><i class='material-icons' style='font-size:2rem;margin:0;'>cancel</i></button>
                    <div style='float:right; cursor:pointer;'>
                        <label for'speed'>Speed:</label>
                        <select id='speed' onChange="${(speed) => { (video.playbackRate != speed) ? video.playbackRate = speed : video.playbackRate = 1 }}">
                            <option value='0.5' class='VodDetails__playButton___RWmZU'>0.5x</option>
                            <option selected value='1' class='VodDetails__playButton___RWmZU'>1x</option>
                            <option value='1.5' class='VodDetails__playButton___RWmZU'>1.5x</option>
                            <option value='2' class='VodDetails__playButton___RWmZU'>2x</option>
                        </select>
                    </div>
                </div>`
                    video.currentTime = Math.floor(Math.random() * 1000);
                    $(controlDeck).insertAfter(".vjs-tech");
                    const speedButton = document.getElementById("speed");
                    speedButton.addEventListener(
                        "change",
                        (speed) => { 
                            (video.playbackRate != speed.target.value) ? video.playbackRate = speed.target.value : video.playbackRate = 1 
                        }
                    )
                    $("#exit").click(function () {
                        $('#customControls').remove()
                    });
                    $("#fastforward").click(function () {
                        video.currentTime += 10;
                    });
                    $("#rewind").click(function () {
                        video.currentTime -= 10;
                    });
                }
            }
        }
    }
});

observer.observe(document.body, {
    childList: true
});