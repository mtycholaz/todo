import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { HomeActions } from '../../actions';
import { HomeState, TodoItem } from '../../state/home.state';

@Component({
    selector: 'todo-home-container',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './home-container.component.html',
})
export class HomeContainerComponent {
    items$: Observable<TodoItem[]> = this.store.select(HomeState.getItems());

    constructor(private store: Store) {}

    onAddItem(item: { name: string }) {
        this.store.dispatch(new HomeActions.AddItem(item.name));
    }

    onUpdateItem(item: {
        name: string;
        isEditing: boolean;
        isCompleted: boolean;
        ix: number;
    }) {
        this.store.dispatch(new HomeActions.UpdateItem(item));
    }

    onDeleteItem(ix: number) {
        this.store.dispatch(new HomeActions.DeleteItem(ix));
    }

    onCompleteItem(ix: number) {
        this.store.dispatch(new HomeActions.CompleteItem(ix));
    }

    onUncompleteItem(ix: number) {
        this.store.dispatch(new HomeActions.UncompleteItem(ix));
    }

    onClearCompleted() {
        this.store.dispatch(new HomeActions.ClearCompleted());
    }
}
