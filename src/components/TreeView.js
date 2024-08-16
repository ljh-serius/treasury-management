import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BasicRichTreeView({ data, entities, onSelectSummary }) {
    const [selectedItems, setSelectedItems] = React.useState([]);
    const [items, setItems] = React.useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    
    const handleSelectedItemsChange = (event, ids) => {
        setSelectedItems(ids);
        onSelectSummary(ids);

        // Redirect to /books if the current path is not /books
        if (location.pathname !== '/books') {
            navigate('/books');
        }
    };

    useEffect(() => {
        const getItems = () => {
            if (data && entities) {
                const newItems = [
                    {
                        id: 'historical',
                        label: 'Historical Book',
                        children: entities.map((entity) => {
                            const yearItems = data.summaries[entity.id]
                                ? Object.keys(data.summaries[entity.id]).map((year) => ({
                                      id: `year-${entity.id}-${year}`,
                                      label: year,
                                  }))
                                : [];

                            return {
                                id: `entity-${entity.id}`,
                                label: entity.name,
                                children: yearItems,
                            };
                        }),
                    },
                ];

                return newItems;
            }

            return [];
        };

        const mainItems = getItems();
        setItems(mainItems);

        // Select 'historical' by default if items are available
        if (mainItems.length > 0) {
            setSelectedItems(['historical']);
            onSelectSummary('historical')
        }
    }, [data, entities]);

    if (!data && !entities) {
        return (
            <Box sx={{ mt: 2, mb: 1, minWidth: 250 }}>
                <Typography variant="body1" color="textSecondary">
                    No summaries available.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 2, mb: 1, minWidth: 250 }}>
            <RichTreeView
                items={items}
                selectedItems={selectedItems}
                onSelectedItemsChange={handleSelectedItemsChange}
            />
        </Box>
    );
}
