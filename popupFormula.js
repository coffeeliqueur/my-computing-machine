

//===========================================================
//   For Calculation Formula Only
//  
//===========================================================
function GetFormulaOld(parent, named, Index) {
    
    var element_LampInstalled = document.getElementById('txtbLampInstalled' + Index);
    var element_AverageHours = document.getElementById('txtbAverageHours' + Index);
    var element_PriceOld = document.getElementById('txtbPriceOld' + Index);
    var element_WattOld = document.getElementById('lblWattOld' + Index);
    var element_LifetimeOld = document.getElementById('lblLifetimeOld' + Index);

    var varTotalYCOld, varTotalYCNew, varTotalSaving;
    var electricityPrice, installationCost;
    var lampInstalled, averageHours, priceOld;

    // Assign 0 for those textboxes /inputs empty data
    // No. of Lamp Installed
    if (element_LampInstalled.value.length == 0) { lampInstalled = 0; } else { lampInstalled = element_LampInstalled.value; }
    // Average Hours
    if (element_AverageHours.value.length == 0) { averageHours = 0; } else { averageHours = element_AverageHours.value; }
    // Price Old
    if (element_PriceOld.value.length == 0) { priceOld = 0; } else { priceOld = element_PriceOld.value; }

     
    //parent.style.backgroundColor = "#fdd29b";
    // Return Total[YearlyCostOld, YearlyCostNew, Saving]
    display_PopupFormula('old', parent, named, lampInstalled, averageHours, priceOld, element_WattOld.innerHTML, element_LifetimeOld.innerHTML);


}

function GetFormulaNew(parent, named, Index) {
    var element_LampInstalled = document.getElementById('txtbLampInstalled' + Index);
    var element_AverageHours = document.getElementById('txtbAverageHours' + Index);
    var element_PriceNew = document.getElementById('lblPriceNew' + Index);
    var element_WattNew = document.getElementById('lblWattNew' + Index);
    var element_LifetimeNew = document.getElementById('lblLifetimeNew' + Index);

    var electricityPrice, installationCost;
    var lampInstalled, averageHours;

    // Assign 0 for those textboxes /inputs empty data
    // No. of Lamp Installed
    if (element_LampInstalled.value.length == 0) { lampInstalled = 0; } else { lampInstalled = element_LampInstalled.value; }
    // Average Hours
    if (element_AverageHours.value.length == 0) { averageHours = 0; } else { averageHours = element_AverageHours.value; }

    display_PopupFormula('new', parent, named, lampInstalled, averageHours, element_PriceNew.innerHTML, element_WattNew.innerHTML, element_LifetimeNew.innerHTML);

}

function display_PopupFormula(mode, parent, named, LampsInstalled, AverageHours, LampPrice, Watt, Lifetime) {
    var element_popup = document.getElementById(named);
    var element_content = document.getElementById('divFormulaContent');
    var element_ElectricityPrice = document.getElementById('inpElectricityPrice');
    var element_CurrencySign = document.getElementById('labelCurrencySign');
    var element_InstallationCost = document.getElementById('inpInstallationCost');
    var var1, var2, var3;

    // Assign 0 for those textboxes /inputs empty data
    // Electricity Price
    if (element_ElectricityPrice.value.length == 0) { electricityPrice = 0; } else { electricityPrice = element_ElectricityPrice.value; }
    // Installation Code
    if (element_InstallationCost.value.length == 0) { installationCost = 0; } else { installationCost = element_InstallationCost.value; }

    
    electricityPrice = removeCommas(electricityPrice);
    installationCost = removeCommas(installationCost);
    LampPrice = removeCommas(LampPrice);

    var1 = (parseFloat(AverageHours) * parseInt(Watt) * parseFloat(electricityPrice) / 1000 * 365) * parseInt(LampsInstalled);
    var2 = (parseFloat(AverageHours) * 365 / parseFloat(Lifetime)) * (parseFloat(LampPrice) + parseFloat(installationCost)) * parseInt(LampsInstalled);
    var3 = parseFloat(var1) + parseFloat(var2);

    element_popup.style.display = "";
    var placement = findPos(parent);
    // hardcode the extra height value
    if (mode == 'new') {
        element_popup.style.left = (placement[0] - 374) + "px";      // reallocate the popup element
        element_popup.style.top = (placement[1] + 30) + "px";
    }
    else {
        element_popup.style.left = (placement[0]) + "px";
        element_popup.style.top = (placement[1] + 30) + "px";
    }

    element_content.innerHTML = "<b>(A) Total Yearly Cost</b><br />";
    element_content.innerHTML += "= (B) + (C)<br />";
    element_content.innerHTML += "= " + element_CurrencySign.innerHTML + " " + addCommas(parseFloat(var1).toFixed(2)) + " + " + element_CurrencySign.innerHTML + " " + addCommas(parseFloat(var2).toFixed(2)) + "<br/>";

    if (parseFloat(var3) == 0) {
        element_content.innerHTML += "= <b> " + element_CurrencySign.innerHTML + " <u>" + addCommas(parseFloat(var3)) + "</u></b><br />";
    }
    else {
        element_content.innerHTML += "= " + element_CurrencySign.innerHTML + " " + addCommas(parseFloat(var3).toFixed(2)) + "<br />";
        element_content.innerHTML += "= <b> " + element_CurrencySign.innerHTML + " <u>" + addCommas(Math.round(parseFloat(var3))) + "</u></b> (rounded) <br />";
    }
    element_content.innerHTML += "<br />";

    element_content.innerHTML += "<b>(B) Yearly Electricity Cost</b><br />"
    element_content.innerHTML += "= (Electricity Cost per year per lamp) x (Lamps Installed)<br />";
    element_content.innerHTML += "= (Average Hours x Wattage x Electricity Price / 1000 x 365) x (Lamps Installed)<br />";
    element_content.innerHTML += "= (" + AverageHours + " x " + Watt + " x " + element_CurrencySign.innerHTML + " " + parseFloat(electricityPrice).toFixed(2) + " / 1000 x 365) x (" + LampsInstalled + ")<br />";
    element_content.innerHTML += "= " + element_CurrencySign.innerHTML + " " + addCommas(parseFloat(var1).toFixed(2)) + "<br/><br />";

    element_content.innerHTML += "<b>(C) Yearly Lamp Depreciation</b><br />";
    element_content.innerHTML += "= [Depreciation per year per lamp including Installation Cost] x [Lamps Installed]<br />";
    element_content.innerHTML += "= [(Average Hours x 365 / Lifetime(hours)) x (Lamp Price + Installation Cost)] x [Lamps Installed]<br />";
    element_content.innerHTML += "= [(" + AverageHours + " x 365 / " + Lifetime + ") x (" + element_CurrencySign.innerHTML + " " + parseFloat(LampPrice).toFixed(2) + " + " + element_CurrencySign.innerHTML + " " + parseFloat(installationCost).toFixed(2) + ")] x [" + LampsInstalled + "]<br />";
    element_content.innerHTML += "= " + element_CurrencySign.innerHTML + " " + addCommas(parseFloat(var2).toFixed(2));

    return true;
}

function CalculateYearlyCost(Index) {
   
    var element_CurrencySign = document.getElementById('labelCurrencySign');
    var element_ElectricityPrice = document.getElementById('inpElectricityPrice');
    var element_InstallationCost = document.getElementById('inpInstallationCost');

    var element_LampInstalled = document.getElementById('txtbLampInstalled' + Index);
    var element_AverageHours = document.getElementById('txtbAverageHours' + Index);

    var element_PriceOld = document.getElementById('txtbPriceOld' + Index);
    var element_WattOld = document.getElementById('lblWattOld' + Index);
    var element_LifetimeOld = document.getElementById('lblLifetimeOld' + Index);
    var element_YearlyCostOld = document.getElementById('lblYearlyCostOld' + Index);

    var element_PriceNew = document.getElementById('lblPriceNew' + Index);
    var element_WattNew = document.getElementById('lblWattNew' + Index);
    var element_LifetimeNew = document.getElementById('lblLifetimeNew' + Index);
    var element_YearlyCostNew = document.getElementById('lblYearlyCostNew' + Index);

    var element_Saving = document.getElementById('lblSaving' + Index);
    var element_SavingPercent = document.getElementById('lblSavingPercent' + Index);

    var element_TotalYCOld = document.getElementById('lblTotalYCOld');
    var element_TotalYCNew = document.getElementById('lblTotalYCNew');
    var element_TotalSaving = document.getElementById('lblTotalSaving');
    var element_TotalSavingPercent = document.getElementById('lblTotalSavingPercent');

    var electricityPrice, installationCost;
    var lampInstalled, averageHours, priceOld;
    var varOld1, varOld2, varYearlyCostOld;
    var varNew1, varNew2, varYearlyCostNew;
    var varSaving;
    var TotalYCOld, TotalYCNew, TotalSaving, TotalSavingPercent;

    if (element_LampInstalled != null) {
      
        // Assign 0 for those textboxes /inputs empty data
        // Electricity Price
        if (element_ElectricityPrice.value.length == 0) { electricityPrice = 0; } else { electricityPrice = element_ElectricityPrice.value; }
        // Installation Code
        if (element_InstallationCost.value.length == 0) { installationCost = 0; } else { installationCost = element_InstallationCost.value; }
        // No. of Lamp Installed
        if (element_LampInstalled.value.length == 0) { lampInstalled = 0; } else { lampInstalled = element_LampInstalled.value; }
        // Average Hours
        if (element_AverageHours.value.length == 0) { averageHours = 0; } else { averageHours = element_AverageHours.value; }
        // Price Old
        if (element_PriceOld.value.length == 0) { priceOld = 0; } else { priceOld = removeCommas(element_PriceOld.value); }

        if (element_ElectricityPrice != null) {
            // Formula: ((AverageHours*Wattage*Electricity Price for Country*365/1000)*NumberofLamps) + ((AverageHours*365/Lifetime)*(lampprice+installationcost)*Numberoflamps))

            // Old
           
            // Assign deduction value (Total - YearlyCost)
            TotalYCOld = parseFloat(removeCommas(element_TotalYCOld.innerHTML)) - parseFloat(removeCommas(element_YearlyCostOld.innerHTML));
           
            // calculate 
            varOld1 = (parseInt(averageHours) * parseInt(element_WattOld.innerHTML) * parseFloat(electricityPrice) / 1000 * 365) * parseInt(lampInstalled);
            varOld2 = (parseInt(averageHours) * 365 / parseInt(element_LifetimeOld.innerHTML)) * (parseFloat(priceOld) + parseFloat(installationCost)) * (parseInt(lampInstalled));
            varYearlyCostOld = (parseFloat(varOld1) + parseFloat(varOld2)).toFixed(2);
            TotalYCOld = (parseInt(TotalYCOld) + Math.round(parseFloat(varYearlyCostOld)));
           
            element_YearlyCostOld.innerHTML = addCommas(Math.round(parseFloat(varYearlyCostOld)));
            element_TotalYCOld.innerHTML = addCommas(TotalYCOld);
           
            // New

            // Assign deduction value (Total - YearlyCost)
            TotalYCNew = parseFloat(removeCommas(element_TotalYCNew.innerHTML)) - parseFloat(removeCommas(element_YearlyCostNew.innerHTML));

            varNew1 = (parseInt(averageHours) * parseInt(element_WattNew.innerHTML) * parseFloat(electricityPrice) / 1000 * 365) * parseInt(lampInstalled);
            varNew2 = (parseInt(averageHours) * 365 / parseInt(element_LifetimeNew.innerHTML)) * (parseFloat(element_PriceNew.innerHTML) + parseFloat(installationCost)) * (parseInt(lampInstalled));
            varYearlyCostNew = (parseFloat(varNew1) + parseFloat(varNew2)).toFixed(2);
            TotalYCNew = (parseInt(TotalYCNew) + Math.round(parseFloat(varYearlyCostNew)));

            element_YearlyCostNew.innerHTML = addCommas(Math.round(parseFloat(varYearlyCostNew)));
            element_TotalYCNew.innerHTML = addCommas(TotalYCNew);
          
            // Saving

            // Assign deduction value (Total - Saving)
            TotalSaving = parseFloat(removeCommas(element_TotalSaving.innerHTML)) - parseFloat(removeCommas(element_Saving.innerHTML));

            varSaving = parseInt(varYearlyCostOld) - parseInt(varYearlyCostNew);
            TotalSaving = parseFloat(TotalSaving) + parseFloat(varSaving);
            TotalSavingPercent = Math.round((parseFloat(TotalSaving) / parseFloat(TotalYCOld)) * 100);

            element_Saving.innerHTML = addCommas(varSaving);
            element_TotalSaving.innerHTML = addCommas(TotalSaving);
            element_TotalSavingPercent.innerHTML = addCommas(TotalSavingPercent) + "%";
           
            if (varSaving == 0) {
                element_SavingPercent.innerHTML = "0%"
            }
            else {
                element_SavingPercent.innerHTML = Math.round((varSaving / parseInt(varYearlyCostOld)) * 100) + "%";
            }

            // ====================================================================
            //  CO2 Emmision & Charting
            CO2EmmissionAndCharting();
           

        }   // End if (element_ElectricityPrice != null)

    }   // End If (element_LampInstalled != null)

}

function CO2EmmissionAndCharting() {
    var element_CalculationTable = document.getElementById('tblCalculation');
    var totalRows, index;
    var CO2Saving = 0;
    var element_AverageHours, element_LampInstalled, element_WattOld, element_WattNew;
    var element_Name, element_YearlyCostOld, element_YearlyCostNew;
    var element_CO2Emmision = document.getElementById('divCO2Emmision');
    var averageHours, lampInstalled;
    var element_chart1 = document.getElementById('divChart1');
    var element_chart2 = document.getElementById('divChart2');
    var varCHLabelName = "", varCHYearlyCostOld = "", varCHYearlyCostNew = "";
    var varScalingCurrent = 0, varScalingLed = 0, varScalingTop = 0;
    var varCountName = 0;

    if (element_CalculationTable != null) {
       
        totalRows = element_CalculationTable.rows.length;

        for (index = 2; index <= totalRows - 2; index++) {
            element_LampInstalled = document.getElementById('txtbLampInstalled' + index);
            element_AverageHours = document.getElementById('txtbAverageHours' + index);
            element_WattOld = document.getElementById('lblWattOld' + index);
            element_WattNew = document.getElementById('lblWattNew' + index);
            element_YearlyCostOld = document.getElementById('lblYearlyCostOld' + index);
            element_YearlyCostNew = document.getElementById('lblYearlyCostNew' + index);
            element_Name = document.getElementById('tcName' + index);

            if (element_AverageHours != null) {
       
                // For CO2 emmission calculation
                if (isNaN(parseInt(element_LampInstalled.value))) { lampInstalled = 0; } else { lampInstalled = parseInt(element_LampInstalled.value); }
                if (isNaN(parseInt(element_AverageHours.value))) { averageHours = 0; } else { averageHours = parseInt(element_AverageHours.value); }

                if (lampInstalled > 0 && averageHours > 0) {
                    CO2Saving = parseFloat(CO2Saving) + ((lampInstalled * averageHours) * (parseInt(element_WattOld.innerHTML) - parseInt(element_WattNew.innerHTML)) / 1000 * 365 * 0.55);
                }

                // For Charting
                if (element_YearlyCostOld.innerHTML != "0") {
                    varCountName = parseInt(varCountName) + 1;
                    varCHLabelName = "|" + element_Name.innerHTML + varCHLabelName;     //~~~~~~~ For charting
                    varCHYearlyCostOld += (parseFloat(removeCommas(element_YearlyCostOld.innerHTML)) / 1000) + ",";
                    varCHYearlyCostNew += (parseFloat(removeCommas(element_YearlyCostNew.innerHTML)) / 1000) + ",";
                    if (parseFloat(removeCommas(element_YearlyCostOld.innerHTML)) > parseFloat(varScalingCurrent)) { varScalingCurrent = removeCommas(element_YearlyCostOld.innerHTML); }
                    if (parseFloat(removeCommas(element_YearlyCostNew.innerHTML)) > parseFloat(varScalingLed)) { varScalingLed = removeCommas(element_YearlyCostNew.innerHTML); }

                }

            }

        }    // End for loop

        // CO2 Emmission Formula : [Total average hours x (Total Current Wattage - Total LED Wattage) / 1000 x 365] x 0.55 kg per kWh / 1000 (for tonnes)
        element_CO2Emmision.innerHTML = "Switching to LED will reduce your CO2-emmission by <b>" + addCommas(parseFloat(CO2Saving).toFixed(0)) + " kg</b> per year.<img src='images/CO2Emmission.png' align='absMiddle' />"

        // Google Charting
        varCHYearlyCostOld = varCHYearlyCostOld.replace(/,$/, "");
        varCHYearlyCostNew = varCHYearlyCostNew.replace(/,$/, "");
        if (parseFloat(varScalingLed) > parseFloat(varScalingCurrent)) {
            varScalingTop = ((parseFloat(varScalingLed) + 1000) / 1000).toFixed(0);
        }
        else {
            varScalingTop = ((parseFloat(varScalingCurrent) + 1000) / 1000).toFixed(0);
            
        };

        var varC1, varC2, varC3, varC4, varC5;
        varC1 = "http://chart.apis.google.com/chart?cht=bhg&chs=700x250&chtt=Yearly Cost+by+Lamp&chts=000000,12,10&chco=8dc63f,6ebbd5&chdl=LED|Current&chdlp=b"; //20,0,10 || 16,0,8 || 12,0,6  || 10,0,5
        varC2 = "&chd=t:" + varCHYearlyCostNew + "|" + varCHYearlyCostOld;
        varC3 = "&chds=0," + varScalingTop + "&chf=bg,s,F5F5F5";
        varC4 = "&chxt=x,x,y&chxl=0:|0|" + (parseInt(varScalingTop) / 4).toFixed(0) + "|" + (parseInt(varScalingTop) / 4 * 2).toFixed(0) + "|" + (parseInt(varScalingTop) / 4 * 3).toFixed(0) + "|" + varScalingTop + "|1:|||Cost in &#39;000|2:" + varCHLabelName;

        if (parseInt(varCountName) <= 3) { varC5 = "&chbh=20,0,10"; }
        else if (parseInt(varCountName) == 4) { varC5 = "&chbh=16,0,8"; }
        else if (parseInt(varCountName) == 5) { varC5 = "&chbh=12,0,6"; }
        else if (parseInt(varCountName) >= 6) { varC5 = "&chbh=10,0,5"; }

        // Yearly Cost by Lamp
        if (element_chart1 != null) {
            element_chart1.innerHTML = "<img src='" + varC1 + varC2 + varC3 + varC4 + varC5 + "' />";
        }

        // Total Yearly Cost in '000
        var element_TotalYCOld = document.getElementById('lblTotalYCOld');
        var element_TotalYCNew = document.getElementById('lblTotalYCNew');
        var varT1 = "", varT2 = "", varT3 = "", varT4 = "";
        varT1 = "http://chart.apis.google.com/chart?cht=bvs&chs=170x250&chtt=Total+Yearly+Cost|in &#39;000&chts=000000,12,10&chco=6ebbd5|8dc63f&chbh=40,20,20&chf=bg,s,EBEBEB";
        varT2 = "&chd=t:" + removeCommas(element_TotalYCOld.innerHTML) + "," + removeCommas(element_TotalYCNew.innerHTML);     // data
        varScalingTop = 0;
        if (parseInt(removeCommas(element_TotalYCOld.innerHTML)) > parseInt(removeCommas(element_TotalYCNew.innerHTML))) {
            varScalingTop = parseInt(removeCommas(element_TotalYCOld.innerHTML)) + 500;
        }
        else {
            varScalingTop = parseInt(removeCommas(element_TotalYCNew.innerHTML)) + 500;
        }
        varT3 = "&chds=0," + varScalingTop;
        varT4 = "&chxt=x,y&chxl=0:|Current|LED|1:|0|" + addCommas(parseInt(varScalingTop / 4 / 1000)) + "|" + addCommas(parseInt(varScalingTop / 4 * 2 / 1000)) + "|" + addCommas(parseInt(varScalingTop / 4 * 3 / 1000)) + "|" + addCommas(parseInt(varScalingTop / 1000));

        if (element_chart2 != null) {
            element_chart2.innerHTML = "<img src='" + varT1 + varT2 + varT3 + varT4 + "' />";
        }

    }    // end if

}

function LoopCalculationTable() {
    var element_CalculationTable = document.getElementById('tblCalculation');
    var totalRows, index;

    if (element_CalculationTable != null) {
        totalRows = element_CalculationTable.rows.length;
        for (index = 2; index <= totalRows - 2; index++) {
            CalculateYearlyCost(index);
        }    // End for loop
    }    // end if

}

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function removeCommas(nStr) {
    nStr = nStr.replace(/\,/g, "");
    return nStr;
}
