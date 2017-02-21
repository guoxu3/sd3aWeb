/**
 * Created by guoxu on 12/7/16.
 */
function getAllMachines() {
    var URL = 'http://oms.miaodeli.com/api/machine?start=0&count=10';
    var machine_data = [];
    var show_button = false;
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok == true) {
                machine_data = models.info['data'];
                show_button = true;
            } else {
                alert(models.info);
            }
            var machine = new Vue({
                el: '#machine',
                data: {
                    machines: machine_data,
                    show_button: show_button
                }
            })
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
            var machine = new Vue({
                el: '#machine',
                data: {
                    machines: machine_data,
                    show_button: show_button
                }
            })
        }
    });
}

function addMachine() {
    var data = {
        machine_name: $("#machine_name").val(),
        inside_ip: $("#inside_ip").val(),
        outside_ip: $("#outside_ip").val(),
        location: $("#location").val(),
        usage: $("#usage").val(),
        is_initialized: $("#is_initialized").val()
    };

    var request = {
        action: 'add',
        data: data
    };

    var encoded;
    encoded = $.toJSON(request);
    var jsonStr = encoded;
    console.log(jsonStr);
    var URL = 'http://oms.miaodeli.com/api/machine';
    $.ajax({
        url: URL,
        type: 'POST',
        data: jsonStr,
        dataType: 'json',
        contentType: 'application/json;charset=utf8',
        success: function (data) {
            var models = data;
            if (models.ok == true) {
                alert("xxxx");
                window.location.href = "/machine/list";
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}

function deleteTask() {
    var task_id = $("#task_id").val();
    var URL = 'http://oms.miaodeli.com/api/machine?task_id=' + task_id;
    $.ajax({
        type: "DELETE",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok == true) {
                alert(models.info);
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}