import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TodoItem } from '../../state/home.state';

@Component({
    selector: 'todo-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnChanges {
    @Input() items: TodoItem[] | null = [];

    @Output() readonly addItem: EventEmitter<{ name: string }> =
        new EventEmitter();

    @Output() readonly updateItem: EventEmitter<{
        name: string;
        isEditing: boolean;
        isCompleted: boolean;
        ix: number;
    }> = new EventEmitter();
    @Output() readonly deleteItem: EventEmitter<number> = new EventEmitter();
    @Output() readonly clearCompleted: EventEmitter<void> = new EventEmitter();
    @Output() readonly completeItem: EventEmitter<number> = new EventEmitter();
    @Output() readonly uncompleteItem: EventEmitter<number> =
        new EventEmitter();

    onAddItem(title: string) {
        if ((title || '').trim().length === 0) {
            return;
        }

        this.addItem.emit({ name: title });
    }

    onUpdateItem(item: TodoItem, name: string, ix: number) {
        this.updateItem.emit({ ...item, name, ix });
    }

    areAllCompleted() {
        return this.items?.every((n) => n.isCompleted);
    }

    areAnyCompleted() {
        return this.items?.some((n) => n.isCompleted);
    }

    onHandleClick(ix: number) {
        this.items[ix].isEditing = true;
    }

    onRemoveItem(ix: number) {
        this.deleteItem.emit(ix);
    }

    onClearCompleted() {
        this.clearCompleted.emit();
    }

    onChange(ev: MatCheckboxChange, ix: number) {
        if (ev.checked) {
            this.completeItem.emit(ix);
        } else {
            this.uncompleteItem.emit(ix);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.items) {
            this.items = [].concat(this.items.map((n) => ({ ...n }))); // clone
        }
    }
}
