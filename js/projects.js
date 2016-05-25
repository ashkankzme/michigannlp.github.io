//global variables
var projects = []
var projectSet = ($.cookie('projectSet') != null)
    ? $.cookie('projectSet')
    : 0;
var currentProject = ($.cookie('currentProject') != null)
    ? $.cookie('currentProject')
    : 'nothing';

$(document).ready(function() {
    //Dynamically load recent news
     $.ajax({
        type: "GET",
        url: "../data/projects.csv",
        dataType: "text",
        success: function(data) {processProjects(data);}
    });
});

function processProjects(allText) {
    arrData = parseCsv(allText);
    
    if(projectSet==0) {
        $('#projects').append('<p class="lead">Click below to learn more about different projects.</p>');
        for (var i=1; i<arrData.length; i++) {
            var data = arrData[i];
            var project = {name:data[0], people:data[1], data:data[2]};
            projects.push(project);
            $('#projects').append('<p class="lead"><a onclick="loadProject(\'' + project.name + '\')" href="#">' + project.name + '</a></p>')
        }
    } else {
        $('#projects').append('<p class="lead"><a onclick="allProjects()" href="">Go back to all projects</a></p>');
        
        for(var i=1; i<arrData.length; i++) {
            var data = arrData[i];
            var project;
            if(data[0] == currentProject) {
                project = {name:data[0], people:data[1], description:data[2]};
                break;
            }
        }
        
        $('#projects').append('<h2 class="featurette-heading">' + project.name + '</h2>');
        $('#projects').append('<p class="lead">' + project.description + '</p>');
        $('#projects').append('<p class="lead">People involved: ' + project.people + '</p>');
        $('#projects').append('<p class="lead"><b>Relevant publications:</b></p>');
        
        $.ajax({
            type: "GET",
            url: "../data/publications.csv",
            dataType: "text",
            success: function(data) {processPublications(data);}
        });
    }
}

function processPublications(allText) {
    arrData = parseCsv(allText);
    
    for (var i=1; i<arrData.length; i++) {
        var data = arrData[i];
        
        var publication = {citation:data[1], link:data[2], category:data[3], demo:data[4], data: data[5], software:data[6]};

        if(publication.category == currentProject) {
            entry = showPublication(publication);
            $('#projects').append('<p class="lead">' + entry + '</p>');
        }
    }
}

function allProjects() {
    $.cookie('projectSet',0);
    location.reload();
}

function loadProject(project) {
    $.cookie('projectSet', 1);
    $.cookie('currentProject',project);
    location.reload();
}