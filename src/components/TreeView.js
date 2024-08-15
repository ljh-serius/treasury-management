import React, { useEffect } from 'react';
import Box from '@mui/material/Box';

import { RichTreeView } from '@mui/x-tree-view/RichTreeView';

export default function BasicRichTreeView({ summaries, entities, onSelectSummary}) {

    const [selectedItems, setSelectedItems] = React.useState([]);
    const [items, setItems] = React.useState([]);

    const handleSelectedItemsChange = (event, ids) => {
        setSelectedItems(ids);
        onSelectSummary(ids);
    };
  
    useEffect(() => {
        const getItems = () => {
            if(Object.keys(summaries).length > 0 && entities.length > 0){
                const newItems = Object.keys(summaries).map((key) => {
                    const relativeEntity = entities.filter((entity) => { return entity.id === key })[0];
                    return {
                        id: relativeEntity.id,
                        label: relativeEntity.name,
                        children: Object.keys(summaries[key]).map((year) => {
                            return {
                                id: key + '-' + year,
                                label: year
                            }
                        })
                    }
                })
    
                return newItems;
            }
    
            return [];
        }

        const newItems = getItems();
        setItems(newItems);
    }, [summaries, entities])
    
    return (
        <Box sx={{ mt: 2, mb: 1, minHeight: 50, minWidth: 250 }}>
            <RichTreeView
                items={items}
                selectedItems={selectedItems}
                onSelectedItemsChange={handleSelectedItemsChange}
            />
        </Box>
    );
}
