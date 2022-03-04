import React from 'react';
import ImagesUtils from 'helpers/ImagesUtils';

const SellerFormRow = ({form}) => (
  <div className="seller-form-container overflow-hidden flex items-center ba b--gray-300 br2">
    <div
      className="h-100 cover bg-center"
      style={{
        width: '12.5%',
        backgroundImage:
          form.image && form.image.upload_path
            ? `url("${ImagesUtils.getImageUrl(form.image)}")`
            : undefined,
      }}
    />
    <div className="w-75 ph4 text-16 gray-600">{form.name}</div>
    <style jsx>{`
      .seller-form-container {
        height: 80px;
      }
    `}</style>
  </div>
);

const EnhacnedSellerFormRow = React.memo(SellerFormRow);

export default EnhacnedSellerFormRow;
