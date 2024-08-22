export const fieldsConfig = {
    bookingId: { label: 'Booking ID', type: 'text', faker: 'datatype.uuid' },
    facilityId: { label: 'Facility ID', type: 'text', faker: 'datatype.uuid' },
    bookedBy: { label: 'Booked By', type: 'text', faker: 'name.fullName' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.future' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    purpose: { label: 'Purpose', type: 'text', faker: 'lorem.sentence' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Facility Booking';
export const collectionName = 'facility-booking';
