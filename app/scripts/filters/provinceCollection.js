'use script'
app.filter('provinceCollection', function () {
    return function(input){
        switch (input +""){
            case "1":input = "北京";break;
            case "2":input = "上海";break;
            case "3":input = "广州";break;
            case "4":input = "青海";break;
            case "5":input = "黑龙江";break;
            case "0":input = "云南";break;
        }
        return input;
    }
}).filter('defraudCategoryFilter', function() {
    return function(input){
        switch (input +""){
            case "1":input = "诈骗类型1";break;
            case "2":input = "诈骗类型2";break;
            case "3":input = "诈骗类型3";break;
            case "4":input = "诈骗类型4";break;
            case "5":input = "诈骗类型5";break;
            case "0":input = "诈骗类型0";break;
        }
        return input;
    }
})