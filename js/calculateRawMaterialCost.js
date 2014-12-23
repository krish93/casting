
    var crca_value,pig_iron_value,foundry_value,grade,type,copper_percentage,carbon_percentage,silicon_percentage,manganese_percentage,crca_qty,pig_iron_qty,foundry_qty,total_qty;
   //calculate Raw Material Cost
   var crca_carbon_percentage,crca_silicon_percentage,crca_manganese_perentage,crca_copper_percentage;
   var pig_iron_carbon_percentage=0,pig_iron_silicon_percentage=0,pig_iron_manganese_percentage=0,pig_iron_copper_percentage=0;
   var foundry_carbon_percentage,foundry_silicon_percentage,foundry_manganese_percentage,foundry_copper_percentage;
   var calculated_copper_percentage,calculated_carbon_percentage,calculated_silicon_percentage,calculated_manganese_percentage;
   
   function getpercentageCrca()
   {
       crca_carbon_percentage = $('input[grade="crca"]:checked').data("carbon");
       crca_silicon_percentage = $('input[grade="crca"]:checked').data("silicon");
       crca_manganese_perentage = $('input[grade="crca"]:checked').data("manganese");
       crca_copper_percentage = $('input[grade="crca"]:checked').data("copper");
   }
   
   function getPercentagePigIron()
   {
       pig_iron_carbon_percentage = $('input[grade="pig_iron"]:checked').data("carbon"); 
       pig_iron_silicon_percentage = $('input[grade="pig_iron"]:checked').data("silicon");
       pig_iron_manganese_percentage = $('input[grade="pig_iron"]:checked').data("manganese");
       pig_iron_copper_percentage = $('input[grade="pig_iron"]:checked').data("copper");
   }
   
   function getPercentageFoundry()
   {
       foundry_carbon_percentage = $('input[grade="foundry"]:checked').data("carbon");
       foundry_silicon_percentage = $('input[grade="foundry"]:checked').data("silicon");
       foundry_manganese_percentage = $('input[grade="foundry]:checked').data("manganese");
       foundry_copper_percentage = $('input[grade="foundry"]:checked').data("copper");
   }
   
   function calculateCarbonWeight()
   {
       return (crca_qty*(crca_carbon_percentage/100))+(pig_iron_qty*(pig_iron_carbon_percentage/100))+(foundry_qty*(foundry_carbon_percentage));
   }
   
   function calculateSiliconWeight()
   {
       return (crca_qty*(crca_silicon_percentage/100))+(pig_iron_qty*(pig_iron_silicon_percentage/100))+(foundry_qty*(foundry_silicon_percentage/100));
   }
   
   function calculateManganeseWeight()
   {
       return (crca_qty*(crca_manganese_perentage/100))+(pig_iron_qty*(pig_iron_manganese_percentage/100))+(foundry_qty*(foundry_manganese_percentage/100));
   }
   
   function calculateCopperWeight()
   {
       return (crca_qty*(crca_copper_percentage/100))+(pig_iron_qty*(pig_iron_copper_percentage/100))+(foundry_qty*(foundry_copper_percentage/100));
   }
   
   function getRawMaterialCost()
   {
      console.log("raw material called");
      grade = $("#grade").val().trim();
      type = $('input[name="iron"]:checked').val();
      total_qty = $("#quantity").val();
      carbon_percentage = $('div [data-type="'+type+'"],[data-grade="'+grade+'"]').data("carbon");
      silicon_percentage = $('div [data-type="'+type+'"],[data-grade="'+grade+'"]').data("silicon");
      manganese_percentage = $('div [data-type="'+type+'"],[data-grade="'+grade+'"]').data("manganese");
      copper_percentage=$('div [data-type="'+type+'"],[data-grade="'+grade+'"]').data("copper");
      crca_qty=total_qty*(60/100);
      getpercentageCrca();
      if($("#pig_iron").is(":checked"))
      {
          pig_iron_qty = total_qty * (10/100);
          foundry_qty = total_qty * (30/100);
          getPercentagePigIron();
          getPercentageFoundry();
      }
      else
      {
          pig_iron_qty = 0;
          foundry_qty = total_qty * (40/100);
          getPercentageFoundry();
      }
      var carbon_weight_percentage = calculateCarbonWeight();
      var silicon_weight_percentage = calculateSiliconWeight();
      var managnese_weight_percentage = calculateManganeseWeight();
      var copper_weight_percentage = calculateCopperWeight();
      
     
   }
