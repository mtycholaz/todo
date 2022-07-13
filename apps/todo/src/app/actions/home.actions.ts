export class AddItem {
    static type = '[Home] Add Item';
    constructor(public name: string) {}
}

export class DeleteItem {
    static type = '[Home] Delete Item';
    constructor(public ix: number) {}
}

export class CompleteItem {
    static type = '[Home] Complete Item';
    constructor(public ix: number) {}
}

export class UncompleteItem {
    static type = '[Home] Uncomplete Item';
    constructor(public ix: number) {}
}

export class UpdateItem {
    static type = '[Home] Update Item';
    constructor(
        public item: {
            name: string;
            isEditing: boolean;
            isCompleted: boolean;
            ix: number;
        }
    ) {}
}

export class ClearCompleted {
    static type = '[Home] Clear Completed';
}
