frappe.ui.form.on("Purchase Order", {
	

    onload: function(frm)
    {
        
         
        // if(cur_frm.doc.workflow_state == "Pending Approval" ){
        //      if (frappe.session.logged_in_user == "Administrator" || frappe.session.logged_in_user == "umesh.sharma@hpl.com.np"){
        //           $("button:contains('Cancel')").show();
                  
        //      }
        
        // }
             // if(frappe.session.user == frm.doc.custom_purchase_approver__id){
                //   $('.actions-btn-group').show()
             // }
        
        // if(cur_frm.doc.workflow_state == "Approved" )
        //        {
        //         frappe.db.get_value("Item", cur_frm.doc.items[0].item_code, 'is_stock_item').then( r => { 
        //           if  ( r.message.is_stock_item == 1 && frappe.session.logged_in_user != "keshav.kc@hpl.com.np" || frappe.session.logged_in_user != "Administrator")
    
        //           {
        //                  $("button:contains('Create')").hide(); 
        //                   console.log("Keshav")
        //           }
        //             if  (  frappe.session.logged_in_user == "Administrator" || frappe.session.logged_in_user == "keshav.kc@hpl.com.np" || frappe.session.logged_in_user == "umesh.sharma@hpl.com.np" || frappe.session.logged_in_user == "narayan.devkota@hpl.com.np" || frappe.session.logged_in_user == "rajiv.ramdam@hpl.com.np" || frappe.session.logged_in_user == "cur_frm.doc.custom_initiator" || frappe.session.logged_in_user == "om.pokharel@hpl.com.np")
    
        //           {
        //                  $("button:contains('Create')").show(); 
                          
        //           }
        //             // cur_frm.refresh_fields();
        //             if (frappe.session.logged_in_user == "Administrator" || frappe.session.logged_in_user == "umesh.sharma@hpl.com.np" || frappe.session.logged_in_user == "surya.karki@hpl.com.np")
        //             {
        //                 $("button:contains('Cancel')").show();
        //             }
    
        //             if(frappe.session.logged_in_user == "narayan.devkota@hpl.com.np")
        //             {
        //                 var bt = ['Purchase Invoice', 'Payment',  'Payment Request', 'Subscription']
        //                 bt.forEach(function(bt){
        //                     frm.page.remove_inner_button(bt, 'Create')
        //                 });
        //             }
                    
    
        //         })
    
        //         frappe.db.get_value("Item", cur_frm.doc.items[0].item_code, 'is_stock_item').then( r => {
        //             if  ( r.message.is_stock_item == 0 && frappe.session.logged_in_user != frm.doc.custom_initiator || frappe.session.logged_in_user != "Administrator")
    
        //             {
        //                    $("button:contains('Create')").show(); 
                            
        //             }
    
    
        //         })
        //            // refresh: function(frm){
        //               //  if  (  frappe.session.logged_in_user == "Administrator" || frappe.session.logged_in_user == "cur_frm.doc.custom_initiator") {
        //                  //   $("button:contains('Create')").show(); 
        //               //  }
        //            // }
                       
        //            }
        
        if (!cur_frm.doc.custom_initiator)
        {
            cur_frm.doc.custom_initiator = cur_frm.doc.owner;
            cur_frm.refresh_fields()
            doc_owner = cur_frm.doc.custom_initiator;
        }
    frappe.call({
                method: 'migration.custom_code.purchase_order.get_approver',
                args: {
                    owner: cur_frm.doc.custom_initiator,
            
                },
                    freeze: true,
                    callback: (r) => {
                console.log(r.message)
                        if(r.message.length > 1)
                {
                frm.set_query('cost_center', () => {
                        return {
                            filters: {
                                name: ['in', r.message]
                            }
                        }
                    })
                }
                 if(r.message.length == 1)   
                 {
                    frm.doc.cost_center = r.message[0]
                     frm.refresh_fields()
                 }
                    },
                    error: (r) => {
                        console.log(r)
                    }
            })
        
        if(!frappe.user.has_role('Administrator'))
        {
            var bt = ['Purchase Invoice', 'Payment',  'Payment Request', 'Subscription']
            bt.forEach(function(bt){
                frm.page.remove_inner_button(bt, 'Create')
                });
        }
           if (frappe.user.has_role('General Manager'))
           {
             cur_frm.page.actions.find('[data-label="Recommend"]').parent().parent().remove();
           }
        
        let amount = 0;
        let limit = 0;
        
        for(let x =0; x < cur_frm.doc.items.length; x++)
            {
                amount  = amount + cur_frm.doc.items[x].base_amount
    
            }
        frappe.db.get_value("Employee",{"user_id": frappe.session.logged_in_user }, "custom_purchase_approval_limit").then((r)=>
            {
                if( amount <= r.message.custom_purchase_approval_limit)
                {
                    cur_frm.page.actions.find('[data-label="Recommend"]').parent().parent().remove(); 
                    
                }
                if( amount > r.message.custom_purchase_approval_limit)
                {
                     cur_frm.page.actions.find('[data-label="Approve"]').parent().parent().remove();
                }
                
            })
    
          if (frm.doc.workflow_state == "Pending" &&  frappe.session.logged_in_user == cur_frm.doc.custom_initiator_manager){
              $('.actions-btn-group').show()
          }
        if (frm.doc.workflow_state == "Pending" && frm.doc.custom_initiator_manager != frappe.session.logged_in_user && !frappe.user.has_role("Administrator") && amount <= limit)
         {
            cur_frm.page.actions.find('[data-label="Recommend"]').parent().parent().remove(); 
            //$('.actions-btn-group').hide()
        }
        
        
         if (frm.doc.workflow_state != "Pending" || frm.doc.workflow_state != "Draft" )
         {		 
            if  ( frm.doc.doc.custom_initiator_manager != frappe.session.logged_in_user && !frappe.user.has_role("Administrator"))
         {
            $('.actions-btn-group').hide()
        }
            //  if (frappe.session.logged_in_user == frm.doc.custom_purchase_approver__id){
            // 	  $('.actions-btn-group').show()
            // }
        
         }
        if ( frm.doc.workflow_state == "Draft" )
        {
            $('.actions-btn-group').show()
        }
        for (let x =0; x <= cur_frm.get_docinfo().assignments.length; x++)
        {
            if ( cur_frm.get_docinfo().assignments[x].owner == frappe.session.logged_in_user)
            {
                $('.actions-btn-group').show()
            }
        }		
            $("button:contains('Get Items From')").hide();

            $("button:contains('Tools')").hide();
            $("button:contains('Status')").hide();
            $("button:contains('Update Items')").hide()
    },
    onload_post_render: function(frm){
        
        if (!cur_frm.doc.custom_initiator)
        {
            
            cur_frm.doc.custom_initiator = cur_frm.doc.owner;
            cur_frm.refresh_fields()
            doc_owner = cur_frm.doc.custom_initiator;
        }
        // if(frappe.session.user == frm.doc.custom_purchase_approver__id){
        // 	$('.actions-btn-group').show()
     //   }
        
        // if(cur_frm.doc.workflow_state == "Pending Approval" ){
        //      if (frappe.session.logged_in_user == "Administrator" || frappe.session.logged_in_user == "umesh.sharma@hpl.com.np"){
        //           $("button:contains('Cancel')").show();
        //      }
        // }
        // if(cur_frm.doc.workflow_state == "Pending Approval" ){
        // 	 if (frappe.session.logged_in_user == frm.doc.custom_purchase_approver__id){
        // 		 $('.actions-btn-group').show()
        // 	}
        // }
        // if(cur_frm.doc.workflow_state == "Pending Approval" ){
        // 	if (frappe.session.logged_in_user == "Administrator" || frappe.session.logged_in_user == "umesh.sharma@hpl.com.np"){
        // 		$('.actions-btn-group').show()
        // 	}
        // }
        if(cur_frm.doc.workflow_state == "Approved" )
               {
                frappe.db.get_value("Item", cur_frm.doc.items[0].item_code, 'is_stock_item').then( r => { 
                  if  ( r.message.is_stock_item == 1 && frappe.session.logged_in_user != "keshav.kc@hpl.com.np" || frappe.session.logged_in_user != "Administrator")
    
                  {
                         $("button:contains('Create')").hide(); 
                          console.log("Keshav")
                  }
                    if  (  frappe.session.logged_in_user == "Administrator" || frappe.session.logged_in_user == "keshav.kc@hpl.com.np" || frappe.session.logged_in_user == "umesh.sharma@hpl.com.np" || frappe.session.logged_in_user == "narayan.devkota@hpl.com.np" || frappe.session.logged_in_user == "rajiv.ramdam@hpl.com.np" || frappe.session.logged_in_user == "cur_frm.doc.custom_initiator" || frappe.session.logged_in_user == "om.pokharel@hpl.com.np")
    
                  {
                         $("button:contains('Create')").show(); 
                          
                  }
                    // cur_frm.refresh_fields();
                    if (frappe.session.logged_in_user == "Administrator" || frappe.session.logged_in_user == "umesh.sharma@hpl.com.np" || frappe.session.logged_in_user == "surya.karki@hpl.com.np")
                    {
                        $("button:contains('Cancel')").show();
                    }
    
                    if(frappe.session.logged_in_user == "narayan.devkota@hpl.com.np")
                    {
                        var bt = ['Purchase Invoice', 'Payment',  'Payment Request', 'Subscription']
                        bt.forEach(function(bt){
                            frm.page.remove_inner_button(bt, 'Create')
                        });
                    }
                    
    
                })
    
                frappe.db.get_value("Item", cur_frm.doc.items[0].item_code, 'is_stock_item').then( r => {
                    if  ( r.message.is_stock_item == 0 && frappe.session.logged_in_user != frm.doc.custom_initiator || frappe.session.logged_in_user != "Administrator")
    
                    {
                           $("button:contains('Create')").show(); 
                            
                    }
    
    
                })
                   // refresh: function(frm){
                      //  if  (  frappe.session.logged_in_user == "Administrator" || frappe.session.logged_in_user == "cur_frm.doc.custom_initiator") {
                         //   $("button:contains('Create')").show(); 
                      //  }
                   // }
                       
                   }
    
    frappe.call({
                method: 'migration.custom_code.purchase_order.get_approver',
                args: {
                    owner: cur_frm.doc.custom_initiator,
            
                },
                    freeze: true,
                    callback: (r) => {
                console.log(r.message)
                        if(r.message.length > 1)
                {
                frm.set_query('cost_center', () => {
                        return {
                            filters: {
                                name: ['in', r.message]
                            }
                        }
                    })
                }
                 if(r.message.length == 1)   
                 {
                    frm.doc.cost_center = r.message[0]
                     frm.refresh_fields()
                 }
                    },
                    error: (r) => {
                        console.log(r)
                    }
            })
        
        if(!frappe.user.has_role('Administrator'))
        {
            var bt = ['Purchase Invoice', 'Payment',  'Payment Request', 'Subscription']
            bt.forEach(function(bt){
                frm.page.remove_inner_button(bt, 'Create')
                });
        }
           if (frappe.user.has_role('General Manager'))
           {
             cur_frm.page.actions.find('[data-label="Recommend"]').parent().parent().remove();
           }
        
        let amount = 0;
        let limit = 0;
        
        for(let x =0; x < cur_frm.doc.items.length; x++)
            {
                amount  = amount + cur_frm.doc.items[x].base_amount
    
            }
        frappe.db.get_value("Employee",{"user_id": frappe.session.logged_in_user }, "custom_purchase_approval_limit").then((r)=>
            {
                if( amount <= r.message.custom_purchase_approval_limit)
                {
                    cur_frm.page.actions.find('[data-label="Recommend"]').parent().parent().remove(); 
                    
                }
                if( amount > r.message.custom_purchase_approval_limit)
                {
                     cur_frm.page.actions.find('[data-label="Approve"]').parent().parent().remove();
                }
                
            })
        if (frm.doc.workflow_state == "Pending" &&  frappe.session.logged_in_user != cur_frm.doc.custom_initiator_manager){
              $('.actions-btn-group').hide()
          }
    
        
        if (frm.doc.workflow_state == "Pending" && frm.doc.custom_initiator_manager != frappe.session.logged_in_user && !frappe.user.has_role("Administrator") && amount <= limit)
         {
            cur_frm.page.actions.find('[data-label="Recommend"]').parent().parent().remove(); 
            // $('.actions-btn-group').hide()
        }
        
         if ( frm.doc.workflow_state != "Pending" &&  frm.doc.workflow_state != "Draft"  )
         {
             // if (frm.doc.custom_purchase_approver__id != frappe.session.logged_in_user && !frappe.user.has_role("Administrator")){
                //  $('.actions-btn-group').hide()
             // }
             
            if  ( frm.doc.custom_purchase_approver__id != frappe.session.logged_in_user && !frappe.user.has_role("Administrator"))
         {
            $('.actions-btn-group').hide()
        }
         }
        if ( frm.doc.workflow_state == "Draft" )
        {
            $('.actions-btn-group').show()
        }
        for (let x =0; x <= cur_frm.get_docinfo().assignments.length; x++)
        {
            if ( cur_frm.get_docinfo().assignments[x].owner == frappe.session.logged_in_user)
            {
                $('.actions-btn-group').show()
            }
        }	
        //just commented - 03/-5/24
            // if (frappe.session.logged_in_user == frm.doc.custom_purchase_approver__id){
            // 	$('.actions-btn-group').show()
            // }
            $("button:contains('Get Items From')").hide();
            $("button:contains('Tools')").hide();
            $("button:contains('Status')").hide();
            $("button:contains('Update Items')").hide()
            
        },
        // validate(frm) 
        // 	{
        //     frappe.call({
     //            method: 'migration.custom_code.purchase_order.add_approver',
     //            args: {
     //                owner: frappe.session.user_email
     //            },
              
     //            callback: (r) => {
            
     //                frm.set_value('custom_purchase_approver__id', r.message)
     //            },
     //            error: (r) => {
     //                console.log(r)
     //            }
                
     //        })
        // frappe.call({
     //            method: 'migration.custom_code.purchase_order.add_approver',
     //            args: {
     //                owner: frm.doc.custom_email_initiator
     //            },
           
     
     //            callback: (r) => {
     //                frm.set_value('custom_initiator_manager', r.message)
     //            },
     //            error: (r) => {
     //                console.log(r)
     //            }
                
     //        })
                
        // 	},
        custom_initiator(frm)
        {
            frappe.call({
                method: 'migration.custom_code.purchase_order.get_approver',
                args: {
                    owner: frm.doc.custom_initiator,
            
                },
                    freeze: true,
                    callback: (r) => {
                console.log(r.message)
                        if(r.message.length > 1)
                {
                cur_frm.set_value('cost_center', "")
                frm.set_query('cost_center', () => {
                        return {
                            filters: {
                                name: ['in', r.message]
                            }
                        }
                    })
                
                }
                 if(r.message.length == 1)   
                 {
                    frm.doc.cost_center = r.message[0]
                     frm.refresh_fields()
                 }
                    },
                    error: (r) => {
                        console.log(r)
                    }
            })
        },
        refresh(frm)
        {
            
            // if(frappe.session.user == frm.doc.custom_purchase_approver__id){
            // 	$('.actions-btn-group').show()
         //   }
            if(cur_frm.doc.workflow_state == "Approved" )
               {
                frappe.db.get_value("Item", cur_frm.doc.items[0].item_code, 'is_stock_item').then( r => { 
                  if  ( r.message.is_stock_item == 1 && frappe.session.logged_in_user != "keshav.kc@hpl.com.np")
    
                  {
                         $("button:contains('Create')").hide(); 
                          console.log("Keshav")
                  }
    
                })
                }
            //cost center code
            if(cur_frm.doc.custom_initiator)
            {
                      frappe.call({
                method: 'migration.custom_code.purchase_order.get_approver',
                args: {
                    owner: frm.doc.custom_initiator,
            
                },
                    freeze: true,
                    callback: (r) => {
                console.log(r.message)
                        if(r.message.length > 1)
                {
                
                frm.set_query('cost_center', () => {
                        return {
                            filters: {
                                name: ['in', r.message]
                            }
                        }
                    })
                
                }
                 if(r.message.length == 1)   
                 {
                    frm.doc.cost_center = r.message[0]
                     frm.refresh_fields()
                 }
                    },
                    error: (r) => {
                        console.log(r)
                    }
            })  
            }
            //  if(!cur_frm.doc.custom_initiator)
            //  {
            // frappe.call({
            //     method: 'migration.custom_code.purchase_order.get_approver',
            //     args: {
            //         owner: frm.doc.owner,
            
            //     },
            //         freeze: true,
            //         callback: (r) => {
            // 	console.log(r.message)
            //             if(r.message.length > 1)
            // 	{
            // 	frm.set_query('cost_center', () => {
            //             return {
            //                 filters: {
            //                     name: ['in', r.message]
            //                 }
            //             }
            //         })
                
            // 	}
            // 	 if(r.message.length == 1)   
            // 	 {
            // 		frm.doc.cost_center = r.message[0]
            // 		 frm.refresh_fields()
            // 	 }
            //         },
            //         error: (r) => {
            //             console.log(r)
            //         }
            // })
            //  }
        
          
            $("button:contains('Get Items From')").hide();
            $("button:contains('Tools')").hide();
            $("button:contains('Status')").hide();
            $("button:contains('Update Items')").hide()
        cur_frm.set_df_property('custom_purchase_approver__id', 'hidden', 1)
        cur_frm.set_df_property('custom_initiator_manager', 'hidden', 1)  
        cur_frm.set_df_property('custom_purchase_request_manager', 'hidden', 1) 
            cur_frm.refresh_fields() 
            frappe.call({
                method: 'migration.api.get_nepali_date',
                args: {
                    date: frm.doc.transaction_date
                },
                freeze: true,
                callback: (r) => {
                    frm.doc.custom_nepali_date = r.message
                    frm.refresh_fields()
                },
                error: (r) => {
                    console.log(r)
                }
            })
    
        },
          
        transaction_date(frm)
        {
            frappe.call({
                method: 'migration.api.get_nepali_date',
                args: {
                    date: frm.doc.transaction_date
                },
                freeze: true,
                callback: (r) => {
                    frm.doc.custom_nepali_date = r.message
                    frm.refresh_fields()
                },
                error: (r) => {
                    console.log(r)
                }
            })
        },
        
    })
    
    
    frappe.ui.form.on("Purchase Taxes and Charges", "account_head", function(frm, cdt, cdn) {
        let item = locals[cdt][cdn]; 
        if (item.account_head.includes('TDS'))
        {
            setTimeout(()=>{
            frappe.model.set_value(cdt, cdn, 'rate', 1.5);
                  frm.refresh_field('taxes');	
            }, 1500);
            
        }
        if (item.account_head.includes('VAT'))
        {
           setTimeout(()=>{
            frappe.model.set_value(cdt, cdn, 'rate', 13);
                  frm.refresh_field('taxes');	
            }, 1500);
        }
    
        
    });
    
    frappe.ui.form.on("Purchase Order Item", "km", function(frm, cdt, cownerdn){
        frappe.utils.filter_dict(cur_frm.fields_dict["items"].grid.grid_rows_by_docname[cdn].docfields, {"fieldname": "description"})[0].reqd = false;
        cur_frm.fields_dict["items"].grid.grid_rows_by_docname[cdn].fields_dict["description"].refresh();
    })
    
    
    function convertToNepaliDate(gregorianDate) {
        const nepaliDate = NepaliDateConverter.convertToNepali(gregorianDate);
        return `${nepaliDate.year}-${nepaliDate.month}-${nepaliDate.day}`;
      }