$(document).ready(function () {
    $("#btnGetData").click(function() {
        loadData(false);
    });
    $('#btnGetDataWithError').click(function() {
        loadData(true);
    });
});



function loadData(error) {
    $.ajax({
        type : "Get",
        url: "Home/GetData",
        data: "withError=" + error,
        success: function (data) {
            $('#id')[0].innerHTML = data.Id;
            $('#name')[0].innerHTML = data.Name;
            $('#age')[0].innerHTML = data.Age;
            if (data.Sex == 0)
                $('#female')[0].checked = true;
            else 
                $('#male')[0].checked = true;
        },
        error: function() {
            alert('error');
        }
    });
}