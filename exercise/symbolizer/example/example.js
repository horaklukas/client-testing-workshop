import ReactDOM from 'react-dom';
import React from 'react';
import Symbolizer from '../src/symbolizer-component';

const examples = [
  {
    title: 'Basic example',
    descr: 'Basic example without any data provided into component and with self-loaded tree data',
    props: {}
  },{
    title: 'Changed selectors',
    descr: 'Example with changed default value of selectors (affiliation, status) ',
    props: { milstdString: 'SFGA' }
  },{
    title: 'Opened category',
    descr: 'Example of open different category than root on symbolizer mount (Favorite in example)',
    props: { category: 'Favorite' }
  },{
    title: 'Selected symbol',
    descr: 'Example of symbol selected when display symbolizer (Ground vehicle symbol in example)',
    props: { milstdString: 'SFGPEV----', symbolName: 'Ground vehicle' }
  },{
    title: 'Update symbol',
    descr: 'Example of update symbol for existing object. When object id and update callback supplied to symbolizer, button for update is displayed.',
    props: { milstdString: 'SHGPUCDSS-', symbolName: 'RBS', objectId: 13, onUpdate: function(id, symbol) {
        alert(`Object with id ${id} changed to ${symbol.name} with ${symbol.milstdString}`);
      }
    }
  },{
    title: 'One level tree',
    descr: 'Example of non deep tree data. Data has only one main level so no level navigation should been displayed.',
    props: { treeData: {
        0: [
          {id:'1313',title:'MBV',value:{symbolId:'UH----',dimension:'G',scheme:'S'}},
          {id:'1317',title:'S10',value:{symbolId:'UCDM--',dimension:'G',scheme:'S'}},
          {id:'1320',title:'RBS',value:{symbolId:'UCDSS-',dimension:'G',scheme:'S'}},
          {id:'1321',title:'RVR',value:{symbolId:'UUMRG-',dimension:'G',scheme:'S'}},
        ]
      }
    }
  },{
    title: 'Selected only mode',
    descr: 'Example of mode where you can\'t selectors are not displayed, so only symbols can be selected (no affiliation, etc.)',
    props: { selectOnly: true, milstdString: 'SF-P', category: 'Favorite'}
  }
]

const placeholder = document.getElementById('symbol-insert');
const tabsContainer = document.getElementById('tabs-container');
const descr = document.getElementById('descr');

for(let idx = 0; idx < examples.length; idx++) {
  let example = examples[idx];
  tabsContainer.innerHTML += `<div class="tab" data-id="${idx}">${example.title}</div>`;
}

tabsContainer.onclick = function(e) {
  const id = e.target.dataset.id;

  if(!id) return; // not clicked tab

  const example = examples[id];
  const activeTab = document.getElementById('active');

  if(activeTab) {
    activeTab.removeAttribute('id');
  }

  e.target.setAttribute('id', 'active');

  descr.innerHTML = `<h1>${example.title}</h1><p>${example.descr}</p>`;

  ReactDOM.unmountComponentAtNode(placeholder);
  ReactDOM.render(<Symbolizer {...example.props} />, placeholder);
}

  /*
  $.ajax({
    url: '../src/php/get-tree-data.php',
    dataType: "json",
    success: function(data, status) {
      props.treeData = data;
      symbolizer = React.renderComponent(
        React.createElement(Symbolizer, props),
        placeholder
      );
    },
    error: function(xhr, err, text) {
      console.error('Error when getting tree data');
    }
  })
  */
