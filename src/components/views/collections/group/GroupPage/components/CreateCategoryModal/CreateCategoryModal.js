import React, {useCallback} from 'react';
import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';

import {CommonButton, FormikInput, Modal, ModalCloseButton} from 'elements';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
});

const CreateCategoryModal = ({onClose, onSubmit, category}) => {
  const handleCloseModal = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(
    async (...args) => {
      await onSubmit(...args);
      handleCloseModal();
    },
    [handleCloseModal, onSubmit]
  );

  return (
    <Modal
      flexibleHeight
      onDismiss={handleCloseModal}
      className="vertical-flex pa3-5"
      size="SMALL"
    >
      <Formik
        initialValues={{
          name: category ? category.name : '',
          uuid: category ? category.uuid : Math.random().toString(36).slice(2),
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({isSubmitting}) => (
          <Form className="h-100 vertical-flex dark-grey">
            <div className="avenir-roman text-18 dark-grey mb3-25">
              {category ? <>Edit a Category</> : <>Create a Category</>}
            </div>
            <div className="avenir-light text-16 dark-grey mb3-5">
              Add a category header and drag it into place on your collection
              list.
            </div>
            <ModalCloseButton className="ma3" onClick={handleCloseModal} />
            <div>
              <Field
                id="name"
                className="br2 mb3-5 category-name mr5"
                name="name"
                small
                component={FormikInput}
                border
                placeholder="Required"
                maxLength={44}
              />
              <div>
                <Field
                  id="uuid"
                  className="dn"
                  name="uuid"
                  component={FormikInput}
                  type="hidden"
                />
              </div>
            </div>
            <div className="flex mt3 items-center">
              <CommonButton
                type="submit"
                className="pt-14 bg-tint white mr3"
                disabled={isSubmitting}
              >
                {category ? <>Update Category</> : <>Create Category</>}
              </CommonButton>
              <CommonButton
                className="pt-14 gray-600 bg-gray-250"
                disabled={isSubmitting}
                onClick={handleCloseModal}
              >
                Cancel
              </CommonButton>
            </div>
          </Form>
        )}
      </Formik>
      <style jsx>{`
        .category-name {
          width: 30rem;
        }
      `}</style>
    </Modal>
  );
};

const EnhancedCreateCategoryModal = React.memo(CreateCategoryModal);

export default EnhancedCreateCategoryModal;
