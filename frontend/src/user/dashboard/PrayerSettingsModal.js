import React from "react";
import Modal from "../Modal";
import PrayerSettings from "../../components/otherprayers/PrayerSettings";

const PrayerSettingsModal = ({ availablePrayers, onVisibilityChange }) => {
    return (
        <Modal id="prayerSettings">
            <PrayerSettings availablePrayers={availablePrayers} onVisibilityChange={onVisibilityChange} />
        </Modal>
    );
};

export default PrayerSettingsModal;
