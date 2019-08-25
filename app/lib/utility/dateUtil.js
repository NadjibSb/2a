exports.getDataArgs = function getDateArgs(givenDate,currentDate){
    try {
        let [day,month,year] = givenDate.split('/');
        let [d,m,y] = [currentDate.getDate(),currentDate.getMonth(),currentDate.getFullYear()];
        let current = (y*365) + ((m+1)*31) + d;
        let date = (parseInt(year)*365) +  (parseInt(month)*31) + parseInt(day);
        if (date-current == 0) {
            return { color: Alloy.CFG.design.fonts.RedColor, text: L('today')}; //red
        }else if (date-current == 1) {
            return { color: Alloy.CFG.design.fonts.RedColor, text: L('tomorrow')}; //red
        }else if (date-current<8) {
            return { color: Alloy.CFG.design.fonts.SecondaryColorDark, text: givenDate}; //orange
        }else {
            return { color: Alloy.CFG.design.fonts.PrimaryColor, text: givenDate}; //blue
        }
    } catch (e) { //if the date format has changed from the api
        return { color: Alloy.CFG.design.fonts.PrimaryColor, text: givenDate};
    }
}
