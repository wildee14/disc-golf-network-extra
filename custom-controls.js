const observer = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
        if (mutation.type === 'childList') {
            for (const _ of mutation.addedNodes) {
                var video = $('.vjs-tech')[0];
                if (video) {
                    var mainVideo = document.evaluate("/html/body/div/div/div[2]/div/div/div/div[1]/video", document, null, 
                                XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    
                    var watchButton = document.evaluate("/html/body/div/div/main/section/div/section/div[2]/div[1]/button[1]", document, null, 
                                XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                   
                    const controlDeck = ` 
                <div id='customControls'>
                    <button class='VodDetails__playButton___RWmZU' style='position:sticky;width:1em;' id='rewind' ><i class='material-icons' style='font-size:2rem;margin:0;'>replay_10</i></button>
                    <button class='VodDetails__playButton___RWmZU' style='position:sticky;width:1em;' id='fastforward' ><i class='material-icons' style='font-size:2rem;margin:0;'>forward_10</i></button>
                    <button class='VodDetails__playButton___RWmZU' style='position:sticky;width:1em;' id='exit' ><i class='material-icons' style='font-size:2rem;margin:0;'>cancel</i></button>
                    <button class='VodDetails__playButton___RWmZU' style='position:sticky;width:1em;' id='moveDown' ><i class='material-icons' style='font-size:2rem;margin:0;'>arrow_downward</i></button>
                    <button class='VodDetails__playButton___RWmZU' style='position:sticky;width:1em;' id='expand' ><i class='material-icons' style='font-size:2rem;margin:0;'>fullscreen</i></button>
                    <div style='float:right; cursor:pointer;'>
                        <label for'speed'>Speed:</label>
                        <select class='speed' id='speed' onChange="${(speed) => { (video.playbackRate != speed) ? video.playbackRate = speed : video.playbackRate = 1 }}">
                            <option value='0.5'>0.5x</option>
                            <option selected value='1'>1x</option>
                            <option value='1.5'>1.5x</option>
                            <option value='2'>2x</option>
                        </select>
                    </div>
                </div>`
                    video.currentTime = Math.floor(Math.random() * 1000);
                    $(controlDeck).insertAfter(video);
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
                    $("#moveDown").click(function () {
                        var control = document.evaluate("/html/body/div/div/div[2]/div/div/div/div[1]/div[1]", document, null, 
                            XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                        
                        control.id === 'customControls' ? $(customControls).insertBefore(watchButton) : $(customControls).insertAfter($('.vjs-tech')[0]);
                    });
                    $("#expand").click(function () {
                        var videoPanel = document.evaluate("/html/body/div/div/div[2]", document, null, 
                            XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                        videoPanel.style.width='100%'
                        videoPanel.style.left='0'
                        videoPanel.style.top='6rem'
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