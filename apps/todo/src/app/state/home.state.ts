import { Injectable } from '@angular/core';
import {
    Action,
    createSelector,
    State,
    StateContext,
    Store,
} from '@ngxs/store';

import { HomeActions } from '../actions';

export interface TodoItem {
    name: string;
    isEditing: boolean;
    isCompleted: boolean;
}

interface StateModel {
    items: TodoItem[];
}

@State<StateModel>({
    name: 'home',
    defaults: {
        items: [],
    },
})
@Injectable()
export class HomeState {
    static getItems() {
        return createSelector([HomeState], (state: StateModel) => state.items);
    }

    constructor(private store: Store) {}

    @Action(HomeActions.AddItem)
    addItem(
        { patchState }: StateContext<StateModel>,
        action: HomeActions.AddItem
    ) {
        const items = [...this.store.selectSnapshot(HomeState.getItems())];

        items.push({ name: action.name, isEditing: false, isCompleted: false });

        patchState({ items });
    }

    @Action(HomeActions.DeleteItem)
    deleteItem(
        { patchState }: StateContext<StateModel>,
        action: HomeActions.DeleteItem
    ) {
        const items = [...this.store.selectSnapshot(HomeState.getItems())];

        items.splice(action.ix, 1);

        patchState({ items });
    }

    @Action(HomeActions.CompleteItem)
    completeItem(
        { patchState }: StateContext<StateModel>,
        action: HomeActions.CompleteItem
    ) {
        const items = [...this.store.selectSnapshot(HomeState.getItems())];

        const item = items[action.ix];
        items[action.ix] = { ...item, isCompleted: true };

        patchState({ items });
    }

    @Action(HomeActions.UncompleteItem)
    uncompleteItem(
        { patchState }: StateContext<StateModel>,
        action: HomeActions.UncompleteItem
    ) {
        const items = [...this.store.selectSnapshot(HomeState.getItems())];

        const item = items[action.ix];
        items[action.ix] = { ...item, isCompleted: false };

        patchState({ items });
    }

    @Action(HomeActions.UpdateItem)
    updateItem(
        { patchState }: StateContext<StateModel>,
        { item }: HomeActions.UpdateItem
    ) {
        const items = [...this.store.selectSnapshot(HomeState.getItems())];

        items[item.ix] = {
            name: item.name,
            isEditing: false,
            isCompleted: item.isCompleted,
        };

        patchState({ items });
    }

    @Action(HomeActions.ClearCompleted)
    clearCompleted(
        { patchState }: StateContext<StateModel>,
        action: HomeActions.ClearCompleted
    ) {
        const items = [...this.store.selectSnapshot(HomeState.getItems())];
        patchState({ items: items.filter((f) => !f.isCompleted) });
    }
}
