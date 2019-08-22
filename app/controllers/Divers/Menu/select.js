var log = require( 'utility/logger' )( {
    tag: "selectScreen",
    hideLog: false
} );
const navManager = require("/utility/navmanager");
const session = require("/dataHandler/session");
const alert = require("/utility/alertManager")
// variable
var filter_name = "Temps de Notification";
var multiselect = 1;
var values = $.args.values

var selected_values = $.args.selected_values
$.select.title = filter_name;


//function
function pressBack(e){
    log("test press")
    navManager.closeWindow($.select)
}
function fillList(){
    fillSection(values, 0);
}

// sa marche
function fillSection(values, sectionIndex){
    var items = [];

    _.each(values, function(value){
        log(selected_values)
        log(value.id)
        var selected = containId(selected_values,value.id)
        items.push({
            template: 'value_template',
            id: value.id,
            value_checkbox: {visible:  multiselect, image: selected? "/images/icn_checkbox.png" : "/images/icn_checkbox_empty.png"},
            value_label: {
                left: multiselect? 15 : 50,
                right: multiselect? 50 : 15,
                text: value.text,
                font: {fontSize: '14sp'},
                color: '#626262',
            },
        });
    });
    $.list.sections[sectionIndex].setItems(items);
}


function selectValue(e) {
    var item = $.list.sections[e.sectionIndex].getItemAt(e.itemIndex);
    var list = values;
    var value = avoirItemById(list,item.id)
    log(value)
    if(multiselect){
        var selected = false;
        /*if(selected_values.map(v=>v.id).indexOf(value.id) < 0) {
            selected_values.push(value);
            selected = true;
        }
        else selected_values.splice(selected_values.map(v=>v.id).indidOf(value.id), 1);*/

        
        if(containId(selected_values,value.id)){
            var toRemove;
            for(var i = 0; i<selected_values.length;i++){
                if(selected_values[i].id == value.id){
                    toRemove = selected_values.splice(i,1);
                    i--;
                }
            }
            //var toRemove = selected_values.splice(value.id-1,1)
            selected = false
            log("uncheck it contain : "+JSON.stringify(toRemove[0]))
            checkItem($.list.sections[e.sectionIndex].getItemAt(toRemove[0].id-1), e.sectionIndex, toRemove[0].id-1, selected);
        }else{
            if(selected_values.length<2){
                selected_values.push(value)
                selected = true
                log("check the second : "+JSON.stringify(value))
                checkItem(item, e.sectionIndex, e.itemIndex, selected);
            }else if(selected_values.length == 2){
                log("2 remove the selected")
                var toRemove = selected_values.shift();
                selected = false
                checkItem($.list.sections[e.sectionIndex].getItemAt(toRemove.id-1), e.sectionIndex, toRemove.id-1, selected);
                //
                selected_values.push(value)
                selected = true
                checkItem(item, e.sectionIndex, e.itemIndex, selected);
            }
        }  
    }
    log(selected_values)
    log("_________ FIN SELECT ___________")
}

function checkItem(item, section_index, item_index, check = true) {
    if(multiselect) item.value_checkbox.image = check? "/images/icn_checkbox.png" : "/images/icn_checkbox_empty.png";
    // item.value_label.font.fontWeight = check? 'bold' : 'normal'; // this was producing a bug
    item.value_label.color = check? '#000' : '#626262';
    log("item indx : "+item_index)
    $.list.sections[section_index].updateItemAt(item_index, item);
}

function save(e) {
    navManager.closeWindow($.select);
    $.args.onSelect(selected_values);
}

// if a list contain id
function containId(list,id){
    log("------- dans containId ---------")
    log(list)
    log("id :" +id)
    var contain = false;
    list.forEach(element => {
        if(element.id == id){
            contain=true
            return
        } 
    });
    log("contain :" +contain)
    log("------ fin contain -----------")
    return contain
}

function avoirItemById(list,id){
    var value = null;
    list.forEach(element =>{
        if(element.id == id){
            value = element
            return
        }
    })
    return value
}

// traintement
fillList();
