$("document").ready(function(){
  var file_lines= [], grade_index, copper_index, silicon_index, manganese_index, carbon_index, type_index, grade = [], copper = [], silicon = [],manganese = [], carbon = [], type = [],mo = [],cr= [],name,cr_index,mo_index;
 function findHit(str) {
    str = str.toLowerCase().trim().replace(/\"/g,'');
    if (typeof str !== 'undefined') {
      if (str.indexOf("copper") !== -1 && str.indexOf("silicon") !== -1 && str.indexOf("manganese") !== -1 && str.indexOf("carbon") !== -1) {
        return 3;
      } else {
        return 0;
      }
    }
    return 0;
  }
  
  //Finding the line which contains the headings
  function findColumnHeadings() {
    var i;
    for (i = 0; i < 6; i += 1) {
      if (findHit(file_lines[i]) === 3) {
        row_index = i;
        break;
      }
    }
   
    var cells = file_lines[row_index].split(',');
    var found_headings_count = 0;
    $.each(cells, function (key, value) {
      value = value.toLowerCase().trim();
      value = value.replace("_", "");
        value=value.replace(/\"/g,'');
      if (value === "grade") {
        grade_index = key;
      } else if (value === "carbon") {
        carbon_index = key;
      } else if (value === "silicon") {
        silicon_index = key;
      } else if (value === "manganese") {
        manganese_index = key;
      } else if (value === "copper") {
        copper_index = key;
      }else if (value === "cr") {
        cr_index = key;
      } else if (value === "mo") {
        mo_index = key;
      }  else if (value === "type") {
        type_index = key;
      }
    });
  }
  
  //Finding whether its a valid category to be included or not
  function isValidCategory(category_temp) {
    if (typeof category_temp !== 'undefined') {
      if (category_temp.length > 0) {
        return true;
      }
    }
    return false;
  }
  
  //Extract Category
  function extractCategories(grade_index,carbon_index,silicon_index,manganese_index,copper_index,type_index) {
    grade_index = parseInt(grade_index);
    carbon_index = parseInt(carbon_index);
    silicon_index = parseInt(silicon_index);
    manganese_index = parseInt(manganese_index);
    copper_index = parseInt(copper_index);
    type_index = parseInt(type_index);
    var i;
    for (i = 1; i < file_lines.length; i += 1)
    {
      var cells = file_lines[i].split(',');  
      if ( isValidCategory(cells[grade_index]) )
      {
        if(cells[grade_index].toLowerCase().trim() == "grade" ){}
        else
        {
          grade.push(cells[grade_index]);
        }
      }
      if( isValidCategory(cells[carbon_index]) )
      {
        if(cells[carbon_index].toLowerCase().trim() == "carbon" ){}
        else
        {
             carbon.push(cells[carbon_index]);
        }
      }
      if( isValidCategory(cells[silicon_index]))      {
        if(cells[silicon_index].toLowerCase().trim() == "silicon" ){}
        else
        {
          silicon.push(cells[silicon_index]);
        }
      }
       if( isValidCategory(cells[manganese_index]))
      {
        if(cells[manganese_index].toLowerCase().trim() == "manganese" ){}
        else
        {
          manganese.push(cells[manganese_index]);
        }
      }
      if( isValidCategory(cells[copper_index]) )
      {
        if(cells[copper_index].toLowerCase().trim() == "copper" ){}
        else
        {
          copper.push(cells[copper_index]);
        }
      }
      if( isValidCategory(cells[type_index]))
      {
          
        if(cells[type_index].toLowerCase().trim() == "type" ){}
        else
        {
            
          type.push(cells[type_index]);
        }
      }
      if ( isValidCategory(cells[mo_index]) )
      {
        if(cells[mo_index].toLowerCase().trim() == "mo" ){}
        else
        {
          mo.push(cells[mo_index]);
        }
      }
      if ( isValidCategory(cells[cr_index]) )
      {
        if(cells[cr_index].toLowerCase().trim() == "cr" ){}
        else
        {
          cr.push(cells[cr_index]);
        }
      }
    }
  }
  
  //Append the Dimension
  function appendGrade()
  {
    $(".upload_get_grade").remove();
   var insert_grade_start="<div class='uplaod_get_grade'";
    var insert_grade_end="</div>";
    for(i=0;i<grade.length;i++)
    {
       
      $("#get_grade").append(insert_grade_start+"data-grade='"+grade[i]+"' data-carbon='"+carbon[i]+"' data-silicon='"+silicon[i]+"' data-manganese='"+manganese[i]+"' data-copper='"+copper[i]+"' data-cr='"+cr[i]+"' data-mo='"+mo[i]+"' data-type='"+type[i]+"' >"+insert_grade_end);
    }
    
  }
  function changeName(value)
    {
      if(value.indexOf("sg_iron")>=0)
      {
        value=value.replace("sg_iron","SG Iron");
      }
      else if(value.indexOf("foundry")>=0)
      {
        value=value.replace("foundry","Charge Mix");
      }
      else if(value.indexOf("boring")>=0)
      {
        value=value.replace("boring","Charge Mix");
      }
      else if(value.indexOf("crca")>=0)
      {
        value=value.replace("crca","Charge Mix")
      }
      else if((value.indexOf("pig_iron")>=0))
      {
        value=value.replace("pig_iron","Charge Mix");
      }
      else if((value.indexOf("pigiron")>=0))
      {
        value=value.replace("pigiron","Charge Mix");
      }
      else if(value === "gray_iron" )
      {
        value=value.replace("gray_iron","Grey Iron");
      }
      return value;
    }
  function changeMaterial(value)
    {
      if(value==="crca")
      {
        value=value.toUpperCase();
      }
      else if(value==="foundry")
      {
        value=value.replace("foundry","Foundry R/R");
      }
      else if(value==="boring")
      {
        value=value.replace("boring","Borings");
      }
      return value;
    }
  function separateGradeDetails(file_data)
  {
    $("#grade_table").append("<tr><th>Sl.No</th><th>Type</th><th>Grade</th><th>Carbon (%)</th><th>Silicon (%)</th><th>Manganese (%)</th><th>Copper (%)</th><th>Cr (%)</th><th>Mo (%)</th></tr>")
    $.each(file_data,function(key,value)
    {
      if(value.type!="")
      {
      var changed_type=changeName(value.type);
      var changed_material=changeMaterial(value.grade.replace("_"," "));
      $("#grade_table").append("<tr><td style='text-align:center'>"+parseInt(key+1)+"</td><td>"+changed_type+"</td><td>"+changed_material+"</td><td>"+value.carbon+"</td><td>"+value.silicon+"</td><td>"+value.manganese+"</td><td>"+value.copper+"</td><td>"+value.cr+"</td><td>"+value.mo+"</td></tr>")
      }
    });
  }

 function inferFile()
 {
   findColumnHeadings();
   extractCategories(grade_index,carbon_index,silicon_index,manganese_index,copper_index,type_index);
   appendGrade();
  }
  $("#grade_success").hide();
  $("#grade_error").hide();
  $('#grade_file').on('change', function(){
    var file = this.files[0];
    var output = []
    var reader = new FileReader();
       reader.readAsText(file);
    if(file.name === "grade.csv")
    {
      $("#grade_error").hide();
      $("#error-message").hide();
      //$("#grade_file").prop('disabled', true);
      if($("#grade_upload_file").hasClass("has-error"))
      {
        $("#grade_upload_file").removeClass("has-error");
      }
      $("#grade_upload_file").addClass("has-success");
      $("#grade_upload_file").addClass("has-feedback");
      $("#grade_success").show();
     // main_file_line = $("#grade_content").html().trim(); 
     reader.onload= function(){
     main_file_line=this.result;
     file_data=$.csv.toObjects(main_file_line);
      var lines = main_file_line.split('\n');
      for (var line =0;line<lines.length-1;line++)
      {
        
        file_lines.push(lines[line]);
      }
   
          separateGradeDetails(file_data);
      inferFile();
    }
    }
    else{
      $("#grade_success").hide();
      if($("#grade_upload_file").hasClass("has-success"))
      {
        $("#grade_upload_file").removeClass("has-success");
      }
      $("#grade_upload_file").addClass("has-error");
      $("#grade_upload_file").addClass("has-feedback");
      $("#grade_error").show();
      $("#error-message").show();
      $("#error-message").html("<div class='alert alert-danger' role='alert'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span class='sr-only'>Error:</span>Uploaded Wrong File</div>'");
    }
 });
    
    $("#iron_new").click(function(){
     $("#gray_bore").css("display","none");
     var file_check = $("#grade_file").val();
     if(!(file_check===""))
     {
      
    $(".new_grade").remove();
        
     name=$("#iron_new").data("name");
    var grade_name="name="+name;
    
     
    var i;
    var insert_grade_option_start="<option class='new_grade'>";
    var insert_grade_option_end="</option>";
    for(i=0;i<type.length;i++)
    {
      if(type[i].trim() === name.trim())
      {
        $("#grade").append(insert_grade_option_start+grade[i]+insert_grade_option_end);
      }
    }
     }else
     {
      
      $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span>Upload the File First by Clicking the icon at the top right corner.!!!</span></div>")
      $(this).prop('checked', false);
     }
  });
  $("#iron_new1").click(function(){
    $("#gray_bore").css("display","block");
    var file_check = $("#grade_file").val();
     if(!(file_check===""))
     {
      
    $(".new_grade").remove();
        
     name=$("#iron_new1").data("name");
    var grade_name="name="+name;
    
     
    var i;
    var insert_grade_option_start="<option class='new_grade'>";
    var insert_grade_option_end="</option>";
    for(i=0;i<type.length;i++)
    {
      if(type[i].trim() === name.trim())
      {
        $("#grade").append(insert_grade_option_start+grade[i]+insert_grade_option_end);
      }
    }
     }else
     {
      
      $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span>Upload the File First by Clicking the icon at the top right corner.!!!</span></div>")
      $(this).prop('checked', false);
     }
  
   
  });
});