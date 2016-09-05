$(document).ready(function() {
    var pageCategory = $('meta[name=category]').attr("content");

    //Dynamically load sponsors
     $.ajax({
        type: "GET",
        url: "../data/sponsors.csv",
        dataType: "text",
        success: function(data) {processSponsors(data,pageCategory);}
    });
});

function processSponsors(allText,pageCategory) {
    arrData = parseCsv(allText);
    
    var rowNum = -1;
    var index = 1;
    for (var i=1; i<arrData.length; i++) {
        var data = arrData[i];
        
        var sponsor = {image:data[0], name:data[1], category:data[2]};

        var allCats = sponsor.category.split(',');
        var found = 0;
        //Is the document category in this array?
        for(var j=0; j<allCats.length; j++) {
            if(allCats[j][0]==' ') {
                allCats[j] = allCats[j].substr(1);
            }
            if(pageCategory==allCats[j]) {
                found = 1;
                break;
            }
        }
        if(found==1) {
            if(index % 4 == 1) { //append new row
                rowNum = rowNum + 1;
                $('#sponsors').append('<div class="row" id="sponsors_row' + rowNum +'">');
            }
            index = index + 1;
            
            entry = '<div class="col-md-3" id="sponsor_cell"><img src="../images/sponsors/'+ sponsor.image + '" class="profile_pic_nonrounded" alt="' + sponsor.name + '"><p class="lead"><b></div>';
            $('#sponsors_row' + rowNum).append(entry);
        }
    }
}