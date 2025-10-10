window.addEventListener('DOMContentLoaded', function(){
    setViewer.init();
});

const setViewer = {
    init: function () {
        this.viewer = document.querySelector('.viewer-inner');
        document.querySelectorAll('.slide-button').forEach((button)=>{
            button.addEventListener('click',()=>{
                if(button.classList.contains('active')){
                    button.classList.remove('active')
                    this.viewer.classList.remove('viewer-bottom-thumbnail');
                }else{
                    button.classList.add('active')
                    this.viewer.classList.add('viewer-bottom-thumbnail');
                }
            })
        })
        document.querySelectorAll('.thumbnail-button').forEach((button)=>{
            button.addEventListener('click',()=>{
                if(button.classList.contains('active')){
                    button.classList.remove('active')
                    this.viewer.classList.remove('listOpen');
                }else{
                    button.classList.add('active')
                    this.viewer.classList.add('listOpen');
                }
            })
        })
        document.querySelectorAll('.list-close-button').forEach((button)=>{
            button.addEventListener('click',()=>{
                document.querySelector('.thumbnail-button').classList.remove('active')
                this.viewer.classList.remove('listOpen');
            })
        })
    }
}