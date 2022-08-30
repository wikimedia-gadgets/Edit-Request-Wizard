// <nowiki>
$(document).ready(function () {

  //CSS loader
  mw.loader.addStyleTag( '.heading { font-size: 22px; text-align: center; margin: 10px; width:100%; font-weight: bold }');
  mw.loader.addStyleTag( '.help { font-size: 13px; font-style: italic }');
  mw.loader.addStyleTag( '.status { font: 13px sans-serif; margin: 5px; width: 70%; font-style: italic; width: 100% }');
  mw.loader.addStyleTag( '.messageStatus { font: 12px sans-serif; margin-left: 1rem; margin: 5px; width: 70%; font-style: italic; width: 100% }');
  mw.loader.addStyleTag( '.welcomebutton { display: inline-grid; text-align: center; margin: 13px; width: 43% }' );
  mw.loader.addStyleTag( '.button { display: inline-block; text-align: center; margin-top: 10px; margin-bottom: 10px }' );
  mw.loader.addStyleTag( '.container { width: 415px; height:150px }');
  mw.loader.addStyleTag( '.status:empty { display: none }');
  mw.loader.addStyleTag( '.copyright { font-size: 10.5px; color: grey; line-height: 140% }');

  
  // It is important to make sure that OOUI is loaded before we can make use of it.
  mw.loader.using("oojs-ui", "mediawiki.api").done(function () {

      // OOUI widgets for main menu welcome panel
      welcomeheading = new OO.ui.LabelWidget({
        label: "Welcome to the Edit Wizard \n",
        classes: ["heading"],
      }),
      welcomebutton1 = new OO.ui.ButtonWidget({
        label: "Add Fact",
        classes: ["welcomebutton"],
        flags: ["primary", "progressive"],
      }),
      welcomebutton2 = new OO.ui.ButtonWidget({
        label: "Fix Factual Error",
        classes: ["welcomebutton"],
        flags: ["primary", "progressive"],
      }),
      welcomebutton3 = new OO.ui.ButtonWidget({
        label: "Remove Content",
        classes: ["welcomebutton"],
        flags: ["primary", "progressive"],
      }),
      welcomebutton4 = new OO.ui.ButtonWidget({
        label: "Do Something Else",
        classes: ["welcomebutton"],
        flags: ["primary", "progressive"],
      }),

      welcomepanel = new OO.ui.PanelLayout({
        content: [
          welcomeheading,
          welcomebutton1,
          welcomebutton2,
          welcomebutton3,
          welcomebutton4,
        ],
        padded: true,
      }),

      // OOUI widgets for Link to the source panel
      linkheading = new OO.ui.LabelWidget({
        label: "Give a source for your fact",
        classes: ["label"],
      }),
      linkhelp = new OO.ui.PopupButtonWidget({
        icon: "info",
        classes: ["help"],
        framed: false,
        label: "More information",
        invisibleLabel: true,
        popup: {
          head: true,
          icon: "infoFilled",
          label: "More information",
          $content: $(
            "<p>This is the link of the source of your quote.\u200e</p>"
          ),
          padded: true,
          align: "center",
          width: "300px",
          autoFlip: true,
        },
      }),
      linkinput = new OO.ui.TextInputWidget({
        placeholder: "Enter the URL",
        classes: ["box"],
      }),
      linkstatus = new OO.ui.MessageWidget({
        inline: true,
        classes: ["status"],
        showClose: true,
        icon:"none",
      }),
      linkverifybutton = new OO.ui.ButtonWidget({
        label: "Verify",
        classes: ["button"],
        flags: ["primary", "progressive"],
      }),
      linkbackbutton = new OO.ui.ButtonWidget({
        label: "Back",
        classes: ["button"],
        flags: ["primary", "progressive"],
      }),
      linkbutton = new OO.ui.ButtonWidget({
        label: "Next",
        classes: ["button"],
        flags: ["primary", "progressive"],
      }),

      linkpanel = new OO.ui.PanelLayout({
        content: [
          linkheading,
          linkhelp,
          linkinput,
          linkstatus,
          linkbackbutton,
          linkverifybutton,
          linkbutton,
        ],
        padded: true,
      }),

      // OOUI widgets for selecting the paragraph panel
      selectfieldsetcontent = new OO.ui.FieldsetLayout({
        label: "Click on the paragraph where your fact should go and click Next",
        classes: ["label"],
      }),
      selectstatus = new OO.ui.MessageWidget({
        inline: true,
        classes: ["status"],
        showClose: true,
        icon:"none",
      }),
      selectbutton = new OO.ui.ButtonWidget({
        label: "Next",
        classes: ["button"],
        flags: ["primary", "progressive"],
      }),
      selectbackbutton = new OO.ui.ButtonWidget({
        label: "Back",
        classes: ["button"],
        flags: ["primary", "progressive"],
      }),

      selectpanel = new OO.ui.PanelLayout({
        content: [
          selectfieldsetcontent,
          selectstatus,
          selectbackbutton,
          selectbutton,
        ],
        padded: true,
      }),

      //OOUI widgets for selecting text panel
      select2fieldsetcontent = new OO.ui.FieldsetLayout({
        label: "Select the text where you want to fix the fact and click Next",
        classes: ["label"],
      }),
      select2status = new OO.ui.MessageWidget({
        inline: true,
        classes: ["status"],
        showClose: true,
        icon:"none",
      }),
      select2button = new OO.ui.ButtonWidget({
        label: "Next",
        classes: ["button"],
        flags: ["primary", "progressive"],
      }),
      select2backbutton = new OO.ui.ButtonWidget({
        label: "Back",
        classes: ["button"],
        flags: ["primary", "progressive"],
      }),

      select2panel = new OO.ui.PanelLayout({
        content: [
          select2fieldsetcontent,
          select2status,
          select2backbutton,
          select2button,
        ],
        padded: true,
      }),

      // OOUI widgets for giving the quote panel
      quoteheading = new OO.ui.LabelWidget({
        label: "Quote from your source that supports your fact",
        classes: ["label"],
      }),
      quotehelp = new OO.ui.PopupButtonWidget({
        icon: "info",
        classes: ["help"],
        framed: false,
        label: "More information",
        invisibleLabel: true,
        popup: {
          head: true,
          icon: "infoFilled",
          label: "More information",
          $content: $(
            "<p>Type the quote text from the above-mentioned source you want to edit.\u200e</p>"
          ),
          padded: true,
          align: "backwards",
          autoFlip: true,
        },
      }),
      quoteinput = new OO.ui.MultilineTextInputWidget({
        autosize: false,
        classes: ["box"],
        rows: 3,
        placeholder: "Enter the Quote from the source",
      }),
      quotestatus = new OO.ui.MessageWidget({
        inline: true,
        classes: ["status"],
        showClose: true,
        icon:"none",
      }),
      quotebutton = new OO.ui.ButtonWidget({
        label: "Next",
        classes: ["button"],
        flags: ["primary", "progressive"],
      }),
      quotebackbutton = new OO.ui.ButtonWidget({
        label: "Back",
        classes: ["button"],
        flags: ["primary", "progressive"],
      }),

      quotepanel = new OO.ui.PanelLayout({
        content: [
          quoteheading,
          quotehelp,
          quoteinput,
          quotestatus,
          quotebackbutton,
          quotebutton,
        ],
        padded: true,
      }),

      // OOUI widgets for re-writing the quote panel
      requoteheading = new OO.ui.LabelWidget({
        label: "Rewrite the quote in your own words",
        classes: ["label"],
      }),
        requotehelp = new OO.ui.PopupButtonWidget({
          icon: "info",
          classes: ["help"],
          framed: false,
          label: "More information",
          invisibleLabel: true,
          popup: {
            head: true,
            icon: "infoFilled",
            label: "More information",
            $content: $("<p>Rephrase the quote in your own words.\u200e</p>"),
            padded: true,
            width: "280px",
            align: "center",
            autoFlip: true,
          },
        }),
        requoteinput = new OO.ui.MultilineTextInputWidget({
          autosize: false,
          classes: ["box"],
          rows: 3,
          placeholder: "Enter the rephrased Quote",
        }),
        requotestatus = new OO.ui.MessageWidget({
          inline: true,
          classes: ["status"],
          showClose: true,
          icon:"none",
        }),
        requotebutton = new OO.ui.ButtonWidget({
          label: "Send Edit Request",
          classes: ["button"],
          flags: ["primary", "progressive"],
        }),
        requotebackbutton = new OO.ui.ButtonWidget({
          label: "Back",
          classes: ["button"],
          flags: ["primary", "progressive"],
        }),
        copyrightText = new OO.ui.LabelWidget({
          label: $( '<p>By publishing changes, you agree to the <a href="https://foundation.wikimedia.org/wiki/Terms_of_Use/en">Terms of Use</a>, and you irrevocably agree to release your contribution under the <a href="https://en.wikipedia.org/wiki/Wikipedia:Text_of_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License">CC BY-SA 3.0 License</a> and the <a href="https://en.wikipedia.org/wiki/Wikipedia:Text_of_the_GNU_Free_Documentation_License">GFDL</a>. You agree that a hyperlink or URL is sufficient attribution under the Creative Commons license.</p>'  ),
          classes: ["copyright"],
        }),

        requotepanel = new OO.ui.PanelLayout({
          content: [
            requoteheading,
            requotehelp,
            requoteinput,
            requotestatus,
            requotebackbutton,
            requotebutton,
            copyrightText,
          ],
          padded: true,
        });

        // OOUI widgets for deleting options panel
        deleteheading = new OO.ui.LabelWidget({
          label: "Reason to Delete",
          classes: ["label"],
        }),
        deleteDropdown = new OO.ui.DropdownWidget( {
          label: 'Select one',
          $overlay: true,
          menu: {
            items: [
              new OO.ui.MenuOptionWidget( {
                data: 'Irrelevant',
                label: 'Irrelevant'
              } ),
              new OO.ui.MenuOptionWidget( {
                data: 'Incorrect',
                label: 'Incorrect'
              } ),
              new OO.ui.MenuOptionWidget( {
                data: 'Misleading',
                label: 'Misleading'
              } ),
              new OO.ui.MenuOptionWidget( {
                data: 'Redundant',
                label: 'Redundant'
              } )
            ]
          }
        } )
        deletebutton = new OO.ui.ButtonWidget({
          label: "Send Edit Request",
          classes: ["button"],
          flags: ["primary", "progressive"],
        }),
        deletebackbutton = new OO.ui.ButtonWidget({
          label: "Back",
          classes: ["button"],
          flags: ["primary", "progressive"],
        }),
        copyrightText = new OO.ui.LabelWidget({
          label: $( '<p>By publishing changes, you agree to the <a href="https://foundation.wikimedia.org/wiki/Terms_of_Use/en">Terms of Use</a>, and you irrevocably agree to release your contribution under the <a href="https://en.wikipedia.org/wiki/Wikipedia:Text_of_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License">CC BY-SA 3.0 License</a> and the <a href="https://en.wikipedia.org/wiki/Wikipedia:Text_of_the_GNU_Free_Documentation_License">GFDL</a>. You agree that a hyperlink or URL is sufficient attribution under the Creative Commons license.</p>'  ),
          classes: ["copyright"],
        }),

        deletepanel = new OO.ui.PanelLayout({
          content: [
            deleteheading,
            deleteDropdown,
            deletebackbutton,
            deletebutton,
            copyrightText,
          ],
          padded: true,
        });
        
      // Stack layout for all the panels
      var stack = new OO.ui.StackLayout({
        classes: ["container"],
        items: [welcomepanel, linkpanel, selectpanel, select2panel, quotepanel, requotepanel, deletepanel],
      });

      // All the functional buttons
      // All welcome panel(main menu) buttons
      welcomebutton1.on('click', addFactPanel);
      welcomebutton2.on('click', fixFactualError);
      welcomebutton3.on('click', deleteFact);
      welcomebutton4.on('click', doSomethingElse);
      // All next buttons
      select2button.on('click', handleselectNext2);
      linkverifybutton.on('click', handlelinkVerify);
      linkbutton.on('click', ref);
      linkbutton.on('click', getSelectionText);
      linkbutton.on('click', handlelinkNext);
      quotebutton.on('click', handlequoteNext);
      selectbutton.on('click', handleselectNext);
      // All publish(send edit request) buttons
      requotebutton.on('click', handlePublish);
      deletebutton.on('click', handlePublishForDelete);
      // All back buttons
      quotebackbutton.on('click', handlequoteBack);
      requotebackbutton.on('click', handlerequoteBack);
      selectbackbutton.on('click', handleselectBack);
      select2backbutton.on('click', handleselectBack2);
      linkbackbutton.on('click', handlelinkBack);
      deletebackbutton.on('click', deleteBack);

      // To particularly know which option the user has opted from the main menu
      var options = 0;

      // To add the first add fact panel(ie link to the source panel)
      function addFactPanel(){
        options = 1;
        stack.setItem( linkpanel );
      }

      let check = 0; //check = 0 (verify button not clicked); check = 1 (source ok can proceed next); check = 2 (source blacklisted cannot proceed next); check = 3 (not a valid URL cannot proceed next)
      
      // To call the backend API to verify the source URL
      async function handlelinkVerify(){
        var linkValue = linkinput.getValue();
        // var linkURL = linkinput.getValue();
        // console.log(linkURL);
        // const linkValue = new URL(linkURL.includes('//') ? linkURL : `//${linkURL}`, 'https://foo.bar').origin;

        linkstatus.setType("none");
        linkstatus.setIcon("null");
        linkstatus.setLabel("Loading...");

        if (linkValue === "") {
          linkstatus.setType("warning");
          linkstatus.setLabel("The input cannot be left empty");
        }
        else{
          //Making an API call to the backend to verify the source
          const host = window.ERW_DEV_MODE ? 'https://edit-wizard.toolforge.org' : 'http://localhost:3000';
          const response = await fetch(`https://edit-wizard.toolforge.org/api/v1/verifySource`, {
            method: "POST",
            body: JSON.stringify({ linkValue}),
            headers: { 'Content-Type': 'application/json'},
          })
          const { comment, flag, kind } = await response.json()
          
          // flag = 0 (Source probably OK); flag = 1 (blacklisted or unreliable source); flag = 2 (not a valid URL)
          
          if(flag==2){
            check = 3;
            linkstatus.setType("error");
            linkstatus.setLabel("This is not a valid URL");
          }
          else if (flag==1) {
            check = 1;
            linkstatus.setType("warning");
            linkstatus.setLabel(comment);
            if (kind == "blacklisted" || kind == "unreliable") {
              check = 2;
              linkstatus.setType("error");
              linkstatus.setLabel(comment);
            }
          }
          else if (flag==0){
              check = 1;
              linkstatus.setType("success");
              linkstatus.setLabel("Source probably OK");
          }
        }
      }

    let linkurl, website; // For saving the source URL and website title
    
    // To handle the URL panel next button and calling the citoid API to add reference for citing the source
    async function handlelinkNext(){
      var linkValue = linkinput.getValue();
      // var linkURL = linkinput.getValue();
      // const linkValue = new URL(linkURL.includes('//') ? linkURL : `//${linkURL}`, 'https://foo.bar').origin;
      const query= encodeURIComponent(linkValue);

      //API call to make a request from Citoid
      if (linkValue!= "") {
      fetch(`https://en.wikipedia.org/api/rest_v1/data/citation/mediawiki/${query}`, {
        headers: {
          'Content-Type': 'application/json',
          'Api-User-Agent': 'w:en:User:Ankit18gupta/MyScript.js'
        }
      })
        .then(response => response.json())
        .then(citationArray => {
          linkurl = citationArray[0].url;
          website = citationArray[0].title;
        })
        .catch((error) => {
          console.log("Error: ",error);
        });
      }
      // If the linkValue is empty, prompt a warning
      if (linkValue === "") {
          linkstatus.setType("warning");
          linkstatus.setLabel("The input cannot be left empty");
      }
      else if(check == 0){
          linkstatus.setType("warning");
          linkstatus.setLabel("Please verify the source first");
      }
      else if(check == 2){
          linkstatus.setType("error");
          linkstatus.setLabel("This is a unreliable source, we cannot proceed");
      }
      else if(check == 3){
          linkstatus.setType("error");
          linkstatus.setLabel("This is not a valid URL, we cannot proceed");
      }
      else if(check == 1){
        if(options == 2){
          stack.setItem( quotepanel );
        }
        else{
          stack.setItem( selectpanel );
        }
      }
      check=0;
    }

    // To include formatted reference in edit request(from citoid)
    var reference=''; //To save the reference result
    function ref(){
      const linkValue = linkinput.getValue();
      const query= encodeURIComponent(linkValue);
      
      //API call to make a request from Citoid
      fetch(`https://en.wikipedia.org/api/rest_v1/data/citation/mediawiki/${query}`, {
        headers: {
          'Content-Type': 'application/json',
          'Api-User-Agent': 'w:en:User:Ankit18gupta/MyScript.js'
        }
      })
        .then(response => response.json())
        .then(citationArray => {
          
          fetch('https://en.wikipedia.org/w/api.php?action=templatedata&titles=Template:Cite%20web&format=json', {
              headers: {
                'Content-Type': 'application/json',
                'Api-User-Agent': 'w:en:User:Ankit18gupta/MyScript.js'
              }
            })
              .then(response => response.json())
              .then(translateArray => {
                const finalArray = Object
                .fromEntries(
                  Object
                    .entries(citationArray[0])
                    .filter(([key, value]) => (key in translateArray.pages['1252907'].maps.citoid))
                    .map(([key, value]) => [translateArray.pages['1252907'].maps.citoid[key], value])
                );

                for (const key in finalArray) {
                  reference = `${reference}|${key}=${finalArray[key]} `;
                }
                reference = `<ref>{{Cite web ${reference}}}</ref>`;
              })
              .catch((error) => {
                console.log("Error: ",error);
              });

        })
        .catch((error) => {
          console.log("Error: ",error);
        });
      
    }

    
    // To get the Selected Paragraph Text
    var text = "", sel;
    function getSelectionText() {
      document.getElementById("mw-content-text").addEventListener("click",function(e) {
        // e.target was the clicked element
        sel = e.target;
        if (e.target && e.target.nodeName == "P") {
          text = e.target.innerText;
        }
      });
      return text;
    }

    // Funtion to get the target Section
    function getSelectionSection(){
      var e = sel;
      var found_it = false;
      while (e.tagName.toLowerCase() !== 'body') {
          if (e.tagName.toLowerCase() === 'h2') {
              found_it = true;
              break;
          }
          if (e.previousElementSibling) {
              e = e.previousElementSibling;
          } else {
              e = e.parentNode;
          }
      }
      return e.firstChild.textContent;
    }

    let selectValue, selectionSection; // To save the selected paragraph and the selected paragraphs's section from the article

    // To handle the Next button of Select paragraph panel
    function handleselectNext(){
      selectValue = text;
      // If the selectValue is empty, prompt a warning
      if (selectValue === "") {
          selectstatus.setType("warning");
          selectstatus.setLabel("Please click on the paragraph before continuing");
      }
      else{
          selectionSection = getSelectionSection();
          stack.setItem( quotepanel );
      }
    }

    // To handle the Next button of quote panel and calling the API from backend to verify if the quote text comes from the source
    async function handlequoteNext(){
      const quoteValue = quoteinput.getValue();
      const linkValue = linkinput.getValue();

      quotestatus.setType("none");
      quotestatus.setIcon("null");
      quotestatus.setLabel("Loading...");
      

      //Calling the API to the backend to verify if the quote comes from the source
      const host = window.ERW_DEV_MODE ? 'https://edit-wizard.toolforge.org' : 'http://localhost:3000';
      const response = await fetch(`https://edit-wizard.toolforge.org/api/v1/verifyQuote`, {
        method: "POST",
        body: JSON.stringify({ linkValue, quoteValue }),
        headers: { 'Content-Type': 'application/json' },
      })
      const { isParagraphTextOnPage } = await response.json()

      if (quoteValue === "") {
        quotestatus.setType("warning");
        quotestatus.setLabel("The input cannot be left empty");
      }
      else if(!isParagraphTextOnPage) {
        quotestatus.setType("error");
        quotestatus.setLabel("The quote does not match. Please make sure the quote is copied/pasted exactly from the source");
      }
      else if (isParagraphTextOnPage) {
        quotestatus.setType("success");
        quotestatus.setLabel("Verified!");
        stack.setItem( requotepanel );
        if(options == 2){
          requoteinput.setValue(selectValue2);
          requoteheading.setLabel("Enter the fixed fact");
        }
      }
      
    }
    
    // To add the fix factual error panel(ie select text panel)
    function fixFactualError(){
      options = 2;
      select2fieldsetcontent.setLabel("Select the text where you want to fix the fact and click Next");
      stack.setItem( select2panel );
    }

    // Function to get the Selected text for fix factual error
    function getSelectionText2() {
      var text = "";
      if (window.getSelection) {
          text = window.getSelection().toString();
      } else if (document.selection && document.selection.type !== "Control") {
          text = document.selection.createRange().text;
      }
      return text;
    }

    // Funtion to get the target Section for fix factual error
    function getSelectionSection2(){
      var e = window.getSelection().anchorNode.parentElement;
      var found_it = false;
      while (e.tagName.toLowerCase() !== 'body') {
          if (e.tagName.toLowerCase() === 'h2') {
              found_it = true;
              break;
          }
          if (e.previousElementSibling) {
              e = e.previousElementSibling;
          } else {
              e = e.parentNode;
          }
      }
      return e.firstChild.textContent;
    }

    var selectValue2, selectionSection2; // to save the selected text and selected text's section from the artice
    
    // To handle the Next button of Select text panel
    function handleselectNext2(){
      selectValue2 = getSelectionText2();
      // If the selectValue is empty, prompt a warning
      if (selectValue2 === "") {
          select2status.setType("warning");
          select2status.setLabel("Please select the text before continuing");
      }
      else if(options == 3){
        stack.setItem( deletepanel );
      }
      else{
          selectionSection2 = getSelectionSection2();
          stack.setItem( linkpanel );
          // selected = 0;
          $("#edit-wizard-link span").html("Edit Wizard");
      }
    }

    // To add the first delete fact panel(ie select text panel)
    function deleteFact(){
      options = 3;
      select2fieldsetcontent.setLabel("Select the text you want to delete and click Next");
      stack.setItem( select2panel );
    }

    // Redirect to the visual editor
    function doSomethingElse(){
      const editURL = mw.util.getUrl(null,{action: 'edit'});
      window.location.href = editURL;
    }

    // To handle the back button of delete panel
    function deleteBack(){
      stack.setItem( select2panel );
    }

    // To handle the back button of URL to source panel
    function handlelinkBack(){
      if(options == 1){
        stack.setItem( welcomepanel );
      }
      if(options == 2){
        stack.setItem( select2panel );
      }
    }
    
    // To handle the back button of select paragraph panel
    function handleselectBack(){
      stack.setItem( linkpanel );
    } 

    // To handle the back button of select text panel
    function handleselectBack2(){
      stack.setItem( welcomepanel );
    }

    
    // To handle the back button of quote panel
    function handlequoteBack(){
      if(options == 1)
      stack.setItem( selectpanel );
      if(options == 2)
      stack.setItem( linkpanel );
    }

    // To handle the back button of requote panel
    function handlerequoteBack(){
      stack.setItem( quotepanel );
    }

    // Helper function for handlePublish function to call the mw API to access and send the edit request to the talk page of current article
    function editPage( info ) {
      var api = new mw.Api();
      api.postWithToken("csrf", {
        action: 'edit',
        title: info.title,
        appendtext: info.text,
        summary: info.summary
      } ).then(function( data ) {
        OO.ui.alert( 'Edit Request sent to talk page..!' );
      } ).catch( function(code, data) {
        console.log( api.getErrorMessage( data ).text());
      } );
    }

    // To handle the send edit request button to send the edit request to the talk page
    function handlePublish(){
        const refer = reference;
        const linkValue = linkinput.getValue();
        const quoteValue = quoteinput.getValue();
        const requoteValue = requoteinput.getValue();
        const firstthree = quoteValue.split(' ').slice(0,3).join(' ');
        const array = quoteValue.split(' ');
        const len = array.length - 3;
        const lastthree = quoteValue.split(' ').slice(len).join(' ');

        if (requoteValue === "") {
            requotestatus.$element.show();
            requotestatus.setType("warning");
            requotestatus.setLabel("The input cannot be left empty");
        }
        else{
            requotestatus.$element.hide();

            // API calls code goes here
            editPage({
              title: (new mw.Title(mw.config.get("wgPageName"))).getTalkPage().toText(),
              text: '\n== Edit Request made by {{subst:REVISIONUSER}} ~~~~~ == \n' + '<br><b>Citation:</b> ' + `[${linkValue} ${website}]` + '<br><b>Section to Edit:</b> ' + selectionSection + '<br><b>Spot where to add the fact:</b> ' + selectValue + '<br><b>Quote:</b> ' + 'Quote starts here - ' + firstthree + '...' + lastthree + '<br><b>Rephrased Quote:</b> ' + "<syntaxhighlight lang='html'>" +requoteValue + refer + "</syntaxhighlight>" + '<br><b>Rendered:</b> '+ requoteValue + refer +'<br> ~~~~',
              summary: 'Edit Request to add a fact'
            }); 
            if(options == 2){
              editPage({
                title: (new mw.Title(mw.config.get("wgPageName"))).getTalkPage().toText(),
                text: '\n== Edit Request made by {{subst:REVISIONUSER}} ~~~~~ == \n' + '<br><b>Citation:</b> ' + `[${linkValue} ${website}]` + '<br><b>Section to Fix:</b> ' + selectionSection2 + '<br><b>Spot where the fact is to be fixed:</b> ' + selectValue2 + '<br><b>Quote:</b> ' + 'Quote starts here - ' + firstthree + '...' + lastthree + '<br><b>Fixed Fact:</b> ' + "<syntaxhighlight lang='html'>" +requoteValue + refer + "</syntaxhighlight>" + '<br><b>Rendered:</b> '+ requoteValue + refer +'<br> ~~~~',
                summary: 'Edit Request to fix the error'
              }); 
            }
        }
    }

    // To handle the send edit request button to send the edit request to the talk page particularly for delete option
    function handlePublishForDelete(){
      const deleteReason = deleteDropdown.getMenu().findSelectedItem().getData();

      editPage({
        title: (new mw.Title(mw.config.get("wgPageName"))).getTalkPage().toText(),
        text: '\n== Edit Request made by {{subst:REVISIONUSER}} ~~~~~ == \n' + '<br><b>Section where to Delete:</b> ' + selectionSection2 + '<br><b>Text to be deleted:</b> ' + selectValue2 + '<br><b>Reason to delete:</b> ' + deleteReason + '<br> ~~~~',
        summary: 'Edit Request to delete the text'
      }); 
    }
    
    // To add the edit wizard tab on the top navigation bar
    var node = mw.util.addPortletLink(
      'p-views',
      "#",
      'Edit Wizard',
      'edit-wizard-link',
      'Edit Wizard',
      "",
      "#ca-history",
    );

    // A popup widget is instantiated
    var popUp = new OO.ui.PopupWidget({
        align: "forwards",
        $floatableContainer: $(node),
        $content: stack.$element,
        padded: true,
        popup: false,
        width: 440,
        height: 250,
        head: true,
        // hideWhenOutOfView: false,
        // autoClose: false,
        hideCloseButton: false,
    });
    
    
    $(node).on('click', function(e){
      popUp.toggle();
      e.preventDefault();
    })

    $(document.body).append(popUp.$element);
  });
});

// </nowiki>