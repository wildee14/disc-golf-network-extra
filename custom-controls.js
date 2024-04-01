const observer = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
        if (mutation.type === 'childList') {
            for (const _ of mutation.addedNodes) {
                                                 
                const firstvideo = document.evaluate("/html/body/div[1]/div/div[2]/div/div/div/div[1]/video", document, null,
                    XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                const secondvideo = document.evaluate("/html/body/div/div/div[2]/div/div/div/div[1]/video", document, null,
                    XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                const video = firstvideo ? firstvideo : (secondvideo ? secondvideo : null)
                if (video) {
                    const watchButton = document.evaluate("/html/body/div/div/main/section/div/section/div[2]/div[1]/button[1]", document, null,
                        XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    const controlButton = (id, icon) => `<button class='controlButtons' id='${id}' ><i class='material-icons' style='font-size:2rem;margin:0;'>${icon}</i></button>`

                    const controlDeck = ` 
                <div id='customControls'>
                    ${controlButton('rewind', 'replay_10')}
                    ${controlButton('fastforward', 'forward_10')}
                    ${controlButton('exit', 'cancel')}
                    ${controlButton('moveDown', 'arrow_downward')}
                    ${controlButton('expand', 'fullscreen')}
                    <div class='speed'>
                        <label for'speed'>Speed:</label>
                        <select class='speed' id='speed' onChange="${(speed) => { (video.playbackRate != speed) ? video.playbackRate = speed : video.playbackRate = 1 }}">
                            <option value='0.5'>0.5x</option>
                            <option selected value='1'>1x</option>
                            <option value='1.5'>1.5x</option>
                            <option value='2'>2x</option>
                            <option value='3'>3x</option>
                        </select>
                    </div>
                </div>`
                    $(controlDeck).insertAfter(video);
                    const speedButton = document.getElementById("speed");
                    speedButton.addEventListener(
                        "change",
                        (speed) => {
                            (video.playbackRate != speed.target.value) ? video.playbackRate = speed.target.value : video.playbackRate = 1
                        }
                    )
                    $("#exit").on("click", function () {
                        $('#customControls').remove()
                    });
                    $("#moveDown").on("click", function () {
                        var control = document.evaluate("/html/body/div/div/div[2]/div/div/div/div[1]/div[1]", document, null,
                            XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

                        control.id === 'customControls' ? $(customControls).insertBefore(watchButton) : $(customControls).insertAfter($('.vjs-tech')[0]);
                    });
                    $("#expand").on("click", function () {
                        var videoPanel = document.evaluate("/html/body/div/div/div[2]", document, null,
                            XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                        videoPanel.style.width = '100%'
                        videoPanel.style.height = '100%-6rem'
                        videoPanel.style.left = '0'
                        videoPanel.style.top = '6rem'
                    });
                    $("#fastforward").on("click", function () {
                        video.currentTime += 10;
                    });
                    $("#rewind").on("click", function () {
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