window.addEventListener('load', function(){
    // hides loading message
    const loading = document.getElementById('loading');
    loading.style.display = 'none';

    // canvas setup
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1400;
    canvas.height = 720;
    
    // implements the full screen functionality 
    const fullScreenBtn = document.getElementById('fullScreenBtn');
    const toggleFullScreen = function toggleFullScreen(){
        if (!document.fullScreenElement){
            canvas.requestFullscreen().catch(err => {
                alert(`Error, can't enable full-screen mode: ${err.message}`);
            })
        } else {
            document.exitFullscreen();
        }
    }
    fullScreenBtn.addEventListener('click', toggleFullScreen);
});