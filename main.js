function calculer(){
  var jQ = jQuery.noConflict();

  jQ(document).ready(function(){
    var actions = [],
        openedPars = false,
        dotted = false,
        output = '',
        realOutput = '';

    // Existing code for calculator functionality...
    
    // Event listener for clearing the display
    jQ('#clear').click(function(){
      output = '';
      realOutput = '';
      actions = [];
      openedPars = false;
      jQ('div.FCC-calculator-display').html(0);
    });

    // for each keypad
    jQ('div.FCC-calculator-num-container').click(function(el){
      jQ('*').removeClass('clicked');
      jQ(this).addClass('clicked');
      // get value
      var keyValue = el.currentTarget.childNodes[0].childNodes[0].data;
      
      if (keyValue){
        // store action
        actions.push(keyValue);
        // operators and special
        if (keyValue === '='){
          // total - evaluate string
          if (openedPars){
            realOutput += ')';
            output += ')';
          }
          realOutput = eval(realOutput);
          // shorten output decimals
          var decimalPosCheck = realOutput.toString().indexOf('.');
          if (decimalPosCheck !== -1){
            var outputStrCheck = realOutput.toString().length - 1;
                decimPos = outputStrCheck - decimalPosCheck;
            if (decimPos > 3){
              realOutput = realOutput.toFixed(4);
            }
          }
          if (realOutput === undefined){
            realOutput = 0;
          }
          // display output
          output = realOutput;
          // set actions to last output
          actions = [];
          var mem = realOutput.toString();
          for (i = 0; i < mem.length; i++){
            actions.push(mem[i]);
          }
          // reset open pars
          openedPars = false;
          // negative output
          var negativeCheckFun = realOutput.toString().split('');
          if (negativeCheckFun[0] === '-'){
            negativeCheckFun.unshift('(');
            realOutput = negativeCheckFun.join('');
            openedPars = true;
          }
        }
        // operators
        else if (keyValue === '✕'){
          output += '*';
          realOutput += '*';
          if (openedPars){
            realOutput = placePars(getNextInt(actions), realOutput);
          }
          else {
            realOutput = placePars(getPrevInt(actions), realOutput);
          }
        }
        else if (keyValue === '➗'){
          output += '/';
          realOutput += '/';
          if (openedPars){
            realOutput = placePars(getNextInt(actions), realOutput);
          }
          else {
            realOutput = placePars(getPrevInt(actions), realOutput);
          }
        }
        else if (keyValue === '➕'){
          output += '+';
          realOutput += '+';
          if (openedPars){
            realOutput = placePars(getNextInt(actions), realOutput);
          }
          else {
            realOutput = placePars(getPrevInt(actions), realOutput);
          }
        }
        else if (keyValue === '➖'){
          var negCheck = actions[actions.length -1];
          // if negative
          if (negCheck === negCheck.replace(/[^*+-\/]/g, '') || actions.length === 1){
            output += '-';
            realOutput += '(-';
            openedPars = true;              
          }
          else {
            output += '-';
            realOutput += '-';
          }
          // for negative values
          var lastAction = actions[actions.length -2],
              lastActionCheck = 'no';
          if (lastAction !== undefined){
            lastActionCheck = lastAction.replace(/[^0-9.-]/g, '');
          }
          if (lastAction === lastActionCheck){
            if (openedPars){
              realOutput = placePars(getNextInt(actions), realOutput);
            }
            else {
              realOutput = placePars(getPrevInt(actions), realOutput);
            }
          }
        }
        // decimal point
        else if (keyValue === '.'){
          if (lastDecNumCheck(actions)){
            output += '.';
            realOutput += '.';
          }
          else {
            actions.pop();
          }
        }
        // add int to string
        else {
          output += keyValue;
          realOutput += keyValue;
        }
        // display output
        if (output === ''){
          jQ('div.FCC-calculator-display').html(0);
        }
        else {
          jQ('div.FCC-calculator-display').html(output);
        }
      }
      // if no keypad value found
      else {
        console.log('BAD ERROR!!!');
      }
    });

  
  });
}

calculer();
