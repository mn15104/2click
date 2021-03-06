
var getJobs = function(){
    $.ajax({
        url: "//localhost:3000/admin/index/getJobs", 
        type: "POST",
        success: function(data){
            var forms = JSON.parse(data);
            parseForms(forms);
        }
    });
}

var parseForms = function(forms){
    var row = forms.map((form) => {
        var job = "<tr> " 
        + "<td>" + form.surname       + "</td>"
        + "<td>" + form.firstname     + "</td>"
        + "<td class = 'row-jobref'>" + form.jobref     + "</td>"
        + "<td>" + form.equipment         + "</td>"
        + "<td>" + form.datein       + "</td>" 
        + "<td>" + form.dateout      + "</td>" 
        + "<td>" + "<button class = 'job-button' type = 'button'> EDIT </button> </td> "
        + "<td hidden class = 'client-id'>" + form.clientid + "</td> </tr>";
        return job}
    )
    row.map(job => {$('#job-table').append(job)})
    $('.job-button').click(function(){
        var jobref = ($(this).closest('tr')).find('.row-jobref').text();
        console.log(jobref)
        $('#jobref').val(jobref);
        $('#submit-button').click();
    })
}

var getClientJobs = function(id){
    $('#jobs-button').trigger('click');
    $("#job-table tr").each(function(){
        if($(this).attr('class') == 'fixed-row')
            $(this).show();
        else if(($(this).find('.client-id')).text() != id){
            $(this).hide();
        }
    });
}

var newClientJob = function(id){
    console.log("sending " + id)
    $('#postClientid').val(id);
    $('#newClientJob').submit();
}

var getClients = function(){
    $.ajax({
        url: "//localhost:3000/admin/index/getClients", 
        type: "POST",
        success: function(data){
           obj = JSON.parse(data)
           console.log(obj)
           var row = obj.map((client) => {
            var cl = "<tr> " 
            + "<td >" + client.surname       + "</td>"
            + "<td >" + client.firstname     + "</td>"
            + "<td >" + client.telephone     + "</td hidden>"
            + "<td>" + client.email         + "</td>"
            + "<td>" + client.address       + "</td>" 
            + "<td>" + client.postcode      + "</td>" 
            + "<td>" + "<button class = 'client-viewjobs-button' type = 'button'> View Jobs </button> </td>"
            + "<td>" + "<button class = 'client-newjob-button' type = 'button'> New Job </button> </td>"
            + "<td hidden class = 'client-id'>" + client.id + "</td>"
            + " </tr>";
            return cl}
            )
            row.map(client => {$('#client-table').append(client)})
            $('.client-viewjobs-button').click(function(){
                var clientid = ($(this).closest('tr')).find('.client-id').text();
                console.log(clientid)
                getClientJobs(clientid);
            })
            $('.client-newjob-button').click(function(){
                var clientid = ($(this).closest('tr')).find('.client-id').text();
                console.log(clientid)
                newClientJob(clientid);
            })
        }
    });
}

function search(searchId) { 
    ($(searchId).find('.search')).on('input', function(){
        var search_index = ($(this).parent('th')).index() + 1;
        var search_value  = $(this).val();
        
        $(".index-table tr").each(function(){
            
            var col_value = $(this).find('td:nth-child(' + search_index + ')').first().text();
            //Ignore header rows 
            if($(this).attr('class') == 'fixed-row')
                $(this).show();
            //Column value doesnt match input search value
            else if(col_value.indexOf(search_value) != 0 && search_value != ''){
                $(this).hide();
            }
            //Column value matches input search value - check rest of row's corresponding search values
            else{
                var shown = true;
                for(var i = 1; i < 4; i++){
                    var search_i = ($(searchId).find('th:nth-child(' + i + ')')).find('.search').val();
                    var col_i    = $(this).find('td:nth-child('+i+')').first().text();
                    if(col_i.indexOf(search_i) != 0 && search_i != ''){
                        shown = false;
                        return;
                    }
                }
                if(shown)
                    $(this).show();
                else
                    $(this).hide();
            }
        })
    })
}