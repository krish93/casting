$("document").ready(function(){
  var file_lines= [], grade_index, copper_index, silicon_index, manganese_index, carbon_index, type_index, grade = [], copper = [], silicon = [],manganese = [], carbon = [], type = [],name;
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
          //console.log(length_index);
      } else if (value === "carbon") {
        carbon_index = key;
      } else if (value === "silicon") {
        silicon_index = key;
      } else if (value === "manganese") {
        manganese_index = key;
      } else if (value === "copper") {
        copper_index = key;
      } else if (value === "type") {
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
      
    }
  }
  
  //Append the Dimension
  function appendGrade()
  {
   var insert_grade_start="<div ";
    var insert_grade_end="</div>";
    for(i=0;i<grade.length;i++)
    {
       
      $("#get_grade").append(insert_grade_start+"data-grade='"+grade[i]+"' data-carbon='"+carbon[i]+"' data-silicon='"+silicon[i]+"' data-manganese='"+manganese[i]+"' data-copper='"+copper[i]+"' data-type='"+type[i]+"' >"+insert_grade_end);
    }
    
  }
  
  
  //Storing details of the file
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
    var reader = new FileReader();
      reader.readAsText(file);
    if(file.name === "grade.csv")
    {
      $("#grade_error").hide();
      $("#error-message").hide();
      $("#grade_file").prop('disabled', true);
      if($("#grade_upload_file").hasClass("has-error"))
      {
        $("#grade_upload_file").removeClass("has-error");
      }
      $("#grade_upload_file").addClass("has-success");
      $("#grade_upload_file").addClass("has-feedback");
      $("#grade_success").show();
      
      reader.onload = function(progressEvent){
        main_file_data = this.result;
        var lines = this.result.split('\n');
        for(var line = 0; line < lines.length; line++){
          file_lines.push(lines[line]);
        }
        inferFile();
      };
      console.log("changed");
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
      $("#error-message").html("<div class='alert alert-danger' role='alert'><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span class='sr-only'>Error:</span>Uploaded Wrong File</div>'");
    }
  });
    
    $("#iron_new").click(function(){
    $(".new_grade").remove();
        
     name=$("#iron_new").data("name");
    var grade_name="name="+name;
        console.log(type[0].trim() === name.trim());
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
  });
  $("#iron_new1").click(function(){
    $(".new_grade").remove();
    name=$("#iron_new1").data("name");
    var grade_name="name="+name;
  
   
  });
});