import * as Form from '@radix-ui/react-form'
import { Button } from '../../Button'

interface FormProps {
  onSubmit: () => void
}

const FormDemo = ({ onSubmit }: FormProps) => (
  <Form.Root className="w-[360px]" onSubmit={onSubmit}>
    <Form.Field className="grid mb-[10px]" name="feedback">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[15px] font-light leading-[35px] text-white">
          How can we improve Smileys?
        </Form.Label>
        <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
          No feedback provided
        </Form.Message>
      </div>
      <Form.Control asChild>
        <textarea
          className="box-border w-full h-[200px] bg-blackA5 shadow-blackA9 inline-flex appearance-none items-center justify-center rounded-[8px] p-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9 resize-none"
          required
          placeholder="Write your message here"
        />
      </Form.Control>
    </Form.Field>
    <Form.Field className="grid mb-[10px]" name="email">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[15px] font-light leading-[35px] text-white">
          Your email address (optional)
        </Form.Label>
        <Form.Message className="text-[13px] text-white opacity-[0.8]" match="typeMismatch">
          Please provide a valid email
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input
          className="box-border w-full bg-blackA5 shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[8px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
          type="email"
          placeholder="Example@gmail.com"
        />
      </Form.Control>
    </Form.Field>
    <div className="flex justify-between">
      <Button
        style={{ backgroundColor: 'red' }}
        className="text-white box-border w-full text-violet11 shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none  focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]"
      >
        Cancel
      </Button>
      <Form.Submit asChild>
        <Button className="bg-red-600 text-white box-border w-full text-violet11 shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none  focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
          Send feedback
        </Button>
      </Form.Submit>
    </div>
  </Form.Root>
)

export default FormDemo
