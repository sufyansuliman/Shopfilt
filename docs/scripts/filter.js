//Creating the session variable
var mySession = window.sessionStorage;

//Filters list as they browse
var filters = {
    "brand": [],
    "article" : [],
    "gender": [],
};

//All filter sections
var allSections = ["brand", "article", "gender"]

//Master Function when filter is clicked
function applyFilters(){
    allFilter(allSections);
}

//Adds checked boxes to filter and session
function allFilter(sections){
    for (let sec in sections){
        filters[sections[sec]] = []
        var allBoxes = document.getElementsByClassName(sections[sec]);
        var allChecked = document.getElementsByClassName(sections[sec] + "All");
        if (allChecked[0].checked){
            for (var j=0; j < allBoxes.length; j++){
                allBoxes[j].checked = true;
            }
        }
        for (var i=0; i < allBoxes.length; i++){ 
            if (allBoxes[i].checked){
                filters[sections[sec]].push(allBoxes[i].id)
            }
        }
    }
    mySession.setItem("filters", JSON.stringify(filters))
}

//Runs on page load and checks boxes that were in session storage
function filterStoring(){
    if (mySession == null){
        return
    } else {
        mySessionJson = sessionParser()
        sidebarPop()
        accordionPops(mySessionJson)
        for (i in mySessionJson){
            var curr = mySessionJson[i]
            for (j in curr){
                if (document.getElementById(curr[j]) != null){
                    document.getElementById(curr[j]).checked = true;
                }
            }
        }
    }
}

//Pop side bar out or in
function sidebarPop(){
    var wrap = document.getElementById("wrapper");
    wrap.classList.toggle("sidebar-displayed");
}

//Pushes accordions out/in
function accordOut(event){
    var cont = event.target.nextElementSibling;
    cont.classList.toggle("accord-pop")
}

//Pushes appropriate accordions out on reload depending if there was a filter applied in that accordion
function accordionPops(mySessionJson){
    keys = Object.keys(mySessionJson)
    for (i in keys){
        if (mySessionJson[keys[i]] != ""){
            document.getElementById(keys[i]).click()
        }
    }
}

//Parses session storage
function sessionParser(){
    var filtersParsed = mySession.filters
    filtersParsed = JSON.parse(filtersParsed)
    return filtersParsed
}
