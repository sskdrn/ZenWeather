import React, { useCallback, useState } from 'react';
import UnitsSettingsView from '@pages/Settings/UnitsSettings/UnitsSettingsView.tsx';
import ConfirmationModal from '@components/ConfirmationModal.tsx';
import useBoolean from '@hooks/useBoolean.ts';
import { UnitsSystems } from '@models/weather-model.ts';
import Strings from '@constants/strings.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/types';
import { globalActions } from '@store/global/slice.ts';

export default function UnitsSettings() {
    const [
        isConfirmationModalVisible,
        showConfirmationModal,
        hideConfirmationModal,
    ] = useBoolean(false);
    const [lockedUnitsSystem, setLockedUnitsSystem] =
        useState<UnitsSystems | null>(null);
    const currentUnitsSystem = useSelector(
        (rootState: RootState) => rootState.global.appSettings.unitsSystem,
    );
    const dispatch = useDispatch();

    const handleOptionSelect = useCallback(
        (selectedUnitsSystem: UnitsSystems) => {
            if (currentUnitsSystem !== selectedUnitsSystem) {
                setLockedUnitsSystem(selectedUnitsSystem);
                showConfirmationModal();
            }
        },
        [currentUnitsSystem],
    );

    const handleConfirmChangeUnit = useCallback(() => {
        hideConfirmationModal();
        if (lockedUnitsSystem) {
            dispatch(
                globalActions.triggerSaveAppSettings({
                    resetApp: true,
                    data: { unitsSystem: lockedUnitsSystem },
                }),
            );
        }
    }, [lockedUnitsSystem]);

    const handleCancelChange = useCallback(() => {
        hideConfirmationModal();
        setLockedUnitsSystem(null);
    }, []);

    return (
        <>
            <UnitsSettingsView
                selectedOption={currentUnitsSystem}
                handleOptionSelect={handleOptionSelect}
            />
            {isConfirmationModalVisible && (
                <ConfirmationModal
                    headingText={Strings.unitsChangeDialogBoxTitle}
                    descriptionText={Strings.unitsChangeDialogBoxDescription}
                    primaryButtonText={Strings.save}
                    secondaryButtonText={Strings.cancel}
                    onPrimaryButtonPress={handleConfirmChangeUnit}
                    onCloseButtonPress={handleCancelChange}
                    onSecondaryButtonPress={handleCancelChange}
                />
            )}
        </>
    );
}
