class Result{
    targetURL;
    engine;
    text;

    constructor(aURL, engine, text){
        this.targetURL = aURL;
        this.engine = engine;
        this.text = text;
    }

    render(){
        // return "<a href=\"" + this.targetURL + "\"> \"" + this.text + "\" </a>";
    }

    getTargetURL(){
        return this.targetURL;
    }

    getEngine(){
        return this.engine;
    }

    getText(){
        return this.text;
    }

}