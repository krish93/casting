$("document").ready(function(){
	var box_table_name,raw_material_table_name,sand_table_name,cold_table_name,foundry_table_name,purchased_good_table_name,good_casting_table_name,dicv_good_casting_table_name;
	var raw_material_row_count,box_row_count,sand_row_count,cold_box_row_count,raw_material_foundry_row_count,purchase_goods_row_count,good_casting_row_count,dicv_good_Casting_row_count;
	var raw_material_column_count,box_column_count,sand_column_count,cold_box_column_count,raw_material_foundry_column_count,purchase_goods_column_count,good_casting_column_count,dicv_good_Casting_column_count;
	var max,max1,max2,final_max,ret = [];
	function getTableName()
	{
		//box_table_name = "#box_table";
		raw_material_table_name = "#raw_material_cost";
		sand_table_name = "#dis_sand_cost";
		cold_table_name = "#dis_cold_cost";
		foundry_table_name = "#raw_material_foundry";
		purchased_good_table_name = "#purchase_goods";
		good_casting_table_name = "#cost_good_casting";
		dicv_good_casting_table_name = "#dicv_cost_good_casting";
	}
	function getRowCount(table_name)
	{
		return $(table_name).find('tr').size();
	}
	function getColumnCount(table_name)
	{
		return $(table_name).find('tr')[1].cells.length;	
	}
	function calcualteRow()
	{
		//box_row_count = getRowCount("#box_table");
		raw_material_row_count = getRowCount("#raw_material_cost");
		sand_row_count = getRowCount("#dis_sand_cost");
		cold_box_row_count = getRowCount("#dis_cold_cost");
		raw_material_foundry_row_count = getRowCount("#raw_material_foundry");
		purchase_goods_row_count = getRowCount("#purchase_goods");
		good_casting_row_count = getRowCount("#cost_good_casting");
		dicv_good_Casting_row_count = getRowCount("#dicv_cost_good_casting");
	}
	function  calculateColumn()
	{
		//box_column_count = getColumnCount("#box_table");
		raw_material_column_count = getColumnCount("#raw_material_cost");
		sand_column_count = getColumnCount("#dis_sand_cost");
		cold_box_column_count = getColumnCount("#dis_cold_cost");
		raw_material_foundry_column_count = getColumnCount("#raw_material_foundry");
		purchase_goods_column_count = getColumnCount("#purchase_goods");
		good_casting_column_count = getColumnCount("#cost_good_casting");
		dicv_good_Casting_column_count = getColumnCount("#dicv_cost_good_casting");
	}
	function getMax(x,y,z)
	{
		if(x>y && x>z)
		{
			return x;
		}
		else if(y>x && y>z)
		{
			return y;
		}
		else
		{
			return z;
		}
	}
	function generateJSON()
	{
		var i=0,box_index=0,keys=[],obj,raw_material_index=0,sand_index=0,cold_box_index=0,foundry_index=0,purchase_goods_index=0,good_casting_index=0,dicv_good_casting_index=0,key_count=0;
		for(i=0;i<final_max;i++)
		{
			if(i==0)
			{
				/*for(;box_index<box_column_count-1;box_index++)
				{
					keys.push($(box_table_name).find('tr')[i].cells[box_index].innerHTML);
				}
				keys.push(" ");*/
				for(;raw_material_index<raw_material_column_count;raw_material_index++)
				{
					keys.push($(raw_material_table_name).find('tr')[i].cells[raw_material_index].innerHTML);
				}
				keys.push(" ");
				for(;sand_index<sand_column_count;sand_index++)
				{
				  if(!($(sand_table_name).find('tr')[i].cells[sand_index]===undefined))
					{
					keys.push($(sand_table_name).find('tr')[i].cells[sand_index].innerHTML);
					}
					else
					{
						keys.push("sand_"+sand_index);
					}
				}
				keys.push(" ");
				for(;cold_box_index<cold_box_column_count;cold_box_index++)
				{
					if(!($(cold_table_name).find('tr')[i].cells[cold_box_index]	===undefined))
					{
					keys.push($(cold_table_name).find('tr')[i].cells[cold_box_index].innerHTML);
					}
					else
					{
						keys.push("cold_"+cold_box_index);
					}
				}
				keys.push(" ");
				for(;foundry_index<raw_material_foundry_column_count;foundry_index++)
				{
					if(!($(foundry_table_name).find('tr')[i].cells[foundry_index]===undefined))
					{
					keys.push($(foundry_table_name).find('tr')[i].cells[foundry_index].innerHTML);
					}
					else
					{
						keys.push("foundry_"+foundry_index);
					}
				}
				keys.push(" ");
				for(;purchase_goods_index<purchase_goods_column_count;purchase_goods_index++)
				{
					if(!($(purchased_good_table_name).find('tr')[i].cells[purchase_goods_index]===undefined))
					{
					keys.push($(purchased_good_table_name).find('tr')[i].cells[purchase_goods_index].innerHTML);
					}
					else
					{
						keys.push("goods_"+purchase_goods_index);
					}
				}
				keys.push(" ");
				for(;good_casting_index<good_casting_column_count;good_casting_index++)
				{
					keys.push($(good_casting_table_name).find('tr')[i].cells[good_casting_index].innerHTML);
				}
				keys.push(" ");
				for(;dicv_good_casting_index<dicv_good_Casting_column_count;dicv_good_casting_index++)
				{
					keys.push("DICV_"+$(dicv_good_casting_table_name).find('tr')[i].cells[dicv_good_casting_index].innerHTML);
				}
				console.log(keys);
			}
			else
			{
				obj={};
				key_count=0;
				/*for(box_index=0;box_index<box_column_count-1;box_index++)
				{
					if(!($(box_table_name).find('tr')[i]===undefined))
					{
					obj[keys[key_count]]= $(box_table_name).find('tr')[i].cells[box_index].innerHTML;
					key_count++;
					}
					else
					{
						obj[keys[key_count++]]=" ";
					}
				}
				obj[keys[key_count++]]="\n";*/
				for(raw_material_index=0;raw_material_index<raw_material_column_count;raw_material_index++)
				{
					if(!($(raw_material_table_name).find('tr')[i]===undefined))
					{
					obj[keys[key_count]]=$(raw_material_table_name).find('tr')[i].cells[raw_material_index].innerHTML;
					key_count++;
					}
					else
					{
						obj[keys[key_count++]]= " ";
					}
				}
				obj[keys[key_count++]]= "\n";
				for(sand_index=0;sand_index<sand_column_count;sand_index++)
				{
				  if(!($(sand_table_name).find('tr')[i]===undefined))
					{
						obj[keys[key_count++]]=$(sand_table_name).find('tr')[i].cells[sand_index].innerHTML;
					}
					else
					{
						obj[keys[key_count++]]= " ";
					}
				}
				obj[keys[key_count++]]="\n";
				for(cold_box_index=0;cold_box_index<cold_box_column_count;cold_box_index++)
				{
					if(!($(cold_table_name).find('tr')[i]	===undefined))
					{
					obj[keys[key_count++]]=$(cold_table_name).find('tr')[i].cells[cold_box_index].innerHTML;
					}
					else
					{
						obj[keys[key_count++]]= " ";
					}
				}
				obj[keys[key_count++]]= "\n";
				for(foundry_index=0;foundry_index<raw_material_foundry_column_count;foundry_index++)
				{
					if(!($(foundry_table_name).find('tr')[i]===undefined))
					{
					obj[keys[key_count++]]=$(foundry_table_name).find('tr')[i].cells[foundry_index].innerHTML;
					}
					else
					{
						obj[keys[key_count++]]=" ";
					}
				}
				obj[keys[key_count++]]="\n";
				for(purchase_goods_index=0;purchase_goods_index<purchase_goods_column_count;purchase_goods_index++)
				{
					if(!($(purchased_good_table_name).find('tr')[i]===undefined))
					{
					obj[keys[key_count++]]=$(purchased_good_table_name).find('tr')[i].cells[purchase_goods_index].innerHTML;
					}
					else
					{
						obj[keys[key_count++]]=" ";
					}
				}
				obj[keys[[key_count++]]]="\n";
				for(good_casting_index=0;good_casting_index<good_casting_column_count;good_casting_index++)
				{
					if(!($(good_casting_table_name).find('tr')[i]===undefined))
					{
						obj[keys[key_count++]]=$(good_casting_table_name).find('tr')[i].cells[good_casting_index].innerHTML;
					}
					else
					{
						obj[keys[key_count++]]=" ";
					}
				}
				obj[keys[key_count++]]="\n";
				for(dicv_good_casting_index=0;dicv_good_casting_index<dicv_good_Casting_column_count;dicv_good_casting_index++)
				{
					if(!($(dicv_good_casting_table_name).find('tr')[i]===undefined))
					{
						obj[keys[key_count++]]=$(dicv_good_casting_table_name).find('tr')[i].cells[dicv_good_casting_index].innerHTML;
					}
					else
					{
						obj[keys[key_count++]]=" ";
					}
				}
								ret.push(obj);
				//console.log(obj);
			}
		}
		//console.log(JSON.stringify(ret));
		$.each(ret,function(key,value){
			$.each(value,function(keys,values){
					if(JSON.stringify(keys).toLowerCase().replace(/\"/g,'').indexOf("_")>=0)
					{
						keys=keys.replace("_","");
				//		console.log(keys);
						//keys=JSON.stringify(keys).toLowerCase().replace(/\"/g,'');
					}
			});
		});
		//console.log(ret);
	}
	function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';    
    //Set Report title in first row or line
  CSV += ReportTitle + '\r\n\n';
   //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
      
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
        
           //Now convert each value to string and comma-seprated
            row += index + ',';
        }
        row = row.slice(0, -1);
        //append Label row with line break
        CSV += row + '\r\n';

    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "MyReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either&gt;&gt; window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp &lt;a /&gt; tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);    }
}
	$("#download_button").click(function(){
		getTableName();
		calcualteRow();
		calculateColumn();
		//console.log(box_row_count+" "+raw_material_row_count+" "+sand_row_count+" "+cold_box_row_count+" "+raw_material_foundry_row_count+" "+purchase_goods_row_count+" "+good_casting_row_count+" "+dicv_good_Casting_row_count)
		max = getMax(box_row_count,raw_material_row_count,sand_row_count);
		max1 = getMax(cold_box_row_count,raw_material_foundry_row_count,purchase_goods_row_count);
		max2 = getMax(good_casting_row_count,dicv_good_Casting_row_count,0);
		final_max = getMax(max,max1,max2);
		generateJSON();
		JSONToCSVConvertor(ret, "Casting", true);
		//console.log(final_max);
		//console.log(box_column_count+" "+raw_material_column_count+" "+sand_column_count+" "+cold_box_column_count+" "+raw_material_foundry_column_count+" "+purchase_goods_column_count+" "+good_casting_column_count+" "+dicv_good_Casting_column_count)
		//getColumnCount();
	});
});