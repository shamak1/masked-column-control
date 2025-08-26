import { IInputs, IOutputs } from './generated/ManifestTypes';
import * as React from 'react';
import { Theme } from '@fluentui/react-components';
import MaskedColumn from './components/maskedcolumn';

export class MaskedColumnControl implements ComponentFramework.ReactControl<IInputs, IOutputs> {
        private notifyOutputChanged: () => void;
    private currentValue: string;

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.currentValue = context.parameters.maskedColumn.raw ?? '';
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        if (context.parameters.maskedColumn.raw !== this.currentValue) {
            this.currentValue = context.parameters.maskedColumn.raw ?? '';
        }

        const regexString = context.parameters.regexColumn.raw ?? '';
        let maskRegex: RegExp;
        
        try {
            if (regexString) {
                const regexPattern = /^\/(.+)\/([gimuy]*)$/;
                const regexMatch = regexPattern.exec(regexString);
                if (regexMatch) {
                    maskRegex = new RegExp(regexMatch[1], regexMatch[2]);
                } else {
                    maskRegex = new RegExp(regexString, 'g');
                }
            } else {
                maskRegex = /./g;
            }
        } catch (error) {
            maskRegex = /./g;
        }

        const maskChar = context.parameters.maskCharColumn.raw ?? '*';
        const effectiveMaskChar = maskChar.length > 0 ? maskChar.charAt(0) : '•';

        return React.createElement(
            MaskedColumn,
            {
                value: this.currentValue,
                onChange: this.handleValueChange.bind(this),
                onBlur: this.handleValueBlur.bind(this),
                disabled: context.mode.isControlDisabled,
                theme: context.fluentDesignLanguage?.tokenTheme as Theme,
                maskRegex: maskRegex,
                maskChar: effectiveMaskChar
            }
        );
    }

    private handleValueChange(newValue: string): void {
        // This allows the UI to update while typing without triggering PCF updates
    }

    private handleValueBlur(newValue: string): void {
        this.currentValue = newValue;
        this.notifyOutputChanged();
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as 'bound' or 'output'
     */
    public getOutputs(): IOutputs {
        return {
            maskedColumn: this.currentValue
        };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}