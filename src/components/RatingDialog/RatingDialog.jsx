import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Rating } from "primereact/rating";
import styles from "./RatingDialog.module.css";
import { database } from "../../service/firebase";
import { ref, update } from "firebase/database";

export default function RatingDialog({
  doctorId,
  visible,
  setVisible,
  isReadOnly = false,
  initialStars = null,
  initialNotes = "",
  onSave,
}) {
  const [stars, setStars] = useState(initialStars);
  const [notes, setNotes] = useState(initialNotes);

  useEffect(() => {
    if (isReadOnly) {
      setStars(initialStars);
      setNotes(initialNotes);
    } else {
      setStars(null);
      setNotes("");
    }
  }, [visible, isReadOnly, initialStars, initialNotes]);

  const isSaveDisabled = stars === null;

  const handleSave = () => {
    const reviewData = {
      date: new Date().toISOString().split("T")[0],
      stars,
      notes,
    };

    const reviewsRef = ref(database, `doctors/${doctorId}/reviews`);

    update(reviewsRef, {
      [Date.now()]: reviewData,
    })
      .then(() => {
        console.log("Review added successfully");
        onSave(reviewData);
      })
      .catch((error) => {
        console.error("Error saving review: ", error);
      });

    setVisible(false);
  };

  const footerContent = !isReadOnly && (
    <div className={styles.dialogFooter}>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text p-button-danger"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        onClick={handleSave}
        disabled={isSaveDisabled}
        className={styles.buttonSuccess}
      />
    </div>
  );

  return (
    <Dialog
      header={isReadOnly ? "Review Details" : "Rate this doctor"}
      visible={visible}
      onHide={() => setVisible(false)}
      footer={footerContent}
    >
      <div className={styles.dialogContent}>
        <div className={styles.field}>
          <label htmlFor="rating" className={styles.dialogLabel}>
            {isReadOnly ? "Rating:" : "Rate:"}
          </label>
          <Rating
            value={stars}
            onChange={(e) => !isReadOnly && setStars(e.value)}
            cancel={false}
            id="rating"
            readOnly={isReadOnly}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="notes" className={styles.dialogLabel}>
            {isReadOnly ? "Notes:" : "Notes (optional):"}
          </label>
          {isReadOnly ? (
            <p>{notes || "No notes provided"}</p>
          ) : (
            <InputTextarea
              id="description"
              placeholder="Add your description here..."
              rows={5}
              cols={30}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={styles.descTextArea}
            />
          )}
        </div>
      </div>
    </Dialog>
  );
}
