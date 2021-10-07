window.onload = function() {
    const converter = new showdown.Converter();
    const pad = document.getElementById('pad');
    const markdownArea = document.getElementById('markdown');   

    pad.addEventListener('keydown',function(e) {
        if(e.keyCode === 9) { 
            const start = this.selectionStart;
            const end = this.selectionEnd;

            const target = e.target;
            const value = target.value;

            target.value = value.substring(0, start)
                            + "\t"
                            + value.substring(end);

            this.selectionStart = this.selectionEnd = start + 1;

            e.preventDefault();
        }
    });

    let previousMarkdownValue;

    const convertTextAreaToMarkdown = () => {
        const markdownText = pad.value;
        previousMarkdownValue = markdownText;
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    };

    const didChangeOccur = () => {
        if(previousMarkdownValue != pad.value){
            return true;
        }
        return false;
    };

    setInterval(() => {
        if(didChangeOccur()){
            convertTextAreaToMarkdown();
        }
    }, 1000);

    pad.addEventListener('input', convertTextAreaToMarkdown);

    if(document.location.pathname.length > 1){
        var documentName = document.location.pathname.substring(1);
        sharejs.open(documentName, 'text', function(error, doc) {
            doc.attach_textarea(pad);
            convertTextAreaToMarkdown();
        });        
    }

    convertTextAreaToMarkdown()
};