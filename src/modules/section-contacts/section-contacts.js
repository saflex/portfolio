const labelToTop = document.querySelectorAll('.contacts__field');
for (const i of labelToTop) {
    i.onfocus = function() {
        this.previousElementSibling.classList.add('active');
    }
    i.onblur = function() {
        if (this.value != '') {
            this.previousElementSibling.classList.add('active');
        }
        else {
            this.previousElementSibling.classList.remove('active');
        }
    }
}
