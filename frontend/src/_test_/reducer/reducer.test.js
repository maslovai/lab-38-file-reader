import React from 'react';
import Enzyme from 'enzyme';
// import Note from '../../../../backend/models/note'
import superagent from 'superagent';
import reducer from '../../components/notes/reducer';


describe('Notes Reducer:', () => {
		
    let testNote = {content:'test note'};
    let state =[];		

    test('adds a new note', () => {
        let action = {type: 'CREATE', payload: testNote};
        state = reducer(state, action);
        console.log("in test add: ",state)
        superagent.get(`${process.env.API_URL}/get`)
        .then(res=> {
            console.log('testing', res.body)
            expect(res.body).not.toBe(null)
        })
        .catch(err=>console.log(err))     
    });


    test('deletes a note', () => {
        state = [testNote];
        // console.log(state);
        state = reducer(state, {
            type: 'DELETE', 
            payload: testNote
        });
        expect(state.length).toEqual(0);
    });
})